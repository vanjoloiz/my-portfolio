import express from "express";
import http from "http";
import cors from "cors";
import next from "next";
import dotenv from "dotenv";
import compression from "compression";
import { Socket } from "socket.io";

import connectDb from "./config/db";
import linkedInAuth from "./api/linkedInAuth";
import githubAuth from "./api/githubAuth";
import authRouter from "./api/auth";
import reviewRouter from "./api/review";
import getInTouchRouter from "./api/getInTouch";
import messageRouter from "./api/message";
import countRouter from "./api/count";
import { corsOptionsDelegate, socketIOCors } from "./utils/cors";
import axios from "axios";
import { BASE_URL } from "./utils/baseUrl";

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, socketIOCors);

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

connectDb();

nextApp.prepare().then(async () => {
  app.use(cors(corsOptionsDelegate));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(compression());

  io.on("connection", (socket: Socket) => {
    socket.on("join", async (userId) => {
      const { data } = await axios.post(`${BASE_URL}/api/v1/count/${userId}`);

      io.emit("updateViewsCount", data);

      socket.on("disconnect", async () => {
        const { data } = await axios.delete(
          `${BASE_URL}/api/v1/count/${userId}`
        );

        io.emit("updateViewsCount", data);
      });
    });
  });

  app.use("/", linkedInAuth);
  app.use("/", githubAuth);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/getInTouch", getInTouchRouter);
  app.use("/api/v1/message", messageRouter);
  app.use("/api/v1/count", countRouter);

  app.get("/health", (req, res) => {
    res.status(200).send("Ok");
  });

  app.all("*", (req, res) => handler(req, res));

  server.listen(PORT, (err: void | boolean) => {
    if (err) throw err;
    console.log(`Express server running on PORT:${PORT}`);
  });
});
