import express from "express";
import http from "http";
import next from "next";
import dotenv from "dotenv";

import connectDb from "./config/db";
import authRouter from "./api/auth";
import reviewRouter from "./api/review";
import emailRouter from "./api/email";

const app = express();

const server = http.createServer(app);

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

connectDb();

nextApp.prepare().then(() => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/email", emailRouter);

  app.get("/health", (req, res) => {
    res.status(200).send("Ok");
  });

  app.all("*", (req, res) => handler(req, res));

  server.listen(PORT, (err: void | boolean) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});
