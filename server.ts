import express from "express";
import http from "http";
import next from "next";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Socket } from "socket.io-client";

import connectDb from "./config/db";
import linkedInAuth from "./api/linkedInAuth";
import githubAuth from "./api/githubAuth";
import authRouter from "./api/auth";
import reviewRouter from "./api/review";
import emailRouter from "./api/email";
import messageRouter from "./api/message";
import { addUser, removeUser, findConnectedUser } from "./utils/roomActions";

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server);

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

connectDb();

nextApp.prepare().then(() => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET!,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", linkedInAuth);
  app.use("/", githubAuth);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/email", emailRouter);
  app.use("/api/v1/message", messageRouter);

  io.on("connection", (socket: Socket) => {
    socket.on("join", async ({ userId }: any) => {
      const users = await addUser(userId, socket.id);

      setInterval(() => {
        socket.emit("connectedUsers", {
          users: users.filter((user: any) => user.userId !== userId),
        });
      }, 10000);

      socket.on("disconnect", () => {
        removeUser(socket.id);
      });
    });

    socket.on("sendMessageToServer", ({ message }: any) => {
      const receiverSocket = findConnectedUser(message.userIdToSend);

      io.to(receiverSocket.socketId).emit("receivedMessageFromServer", {
        message,
      });
    });
  });

  app.get("/health", (req, res) => {
    res.status(200).send("Ok");
  });

  app.all("*", (req, res) => handler(req, res));

  server.listen(PORT, (err: void | boolean) => {
    if (err) throw err;
    console.log(`Express server running on PORT:${PORT}`);
  });
});
