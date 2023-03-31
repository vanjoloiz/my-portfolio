import express from "express";
import next from "next";

import connectDb from "./config/db";
import authRouter from "./api/auth";
import reviewRouter from "./api/review";

const app = express();

const server = require("http").createServer(app);

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

connectDb();

nextApp.prepare().then(() => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);

  app.all("*", (req: any, res: any) => handler(req, res));

  app.get("/health", (req, res) => {
    res.status(200).send("Ok");
  });

  server.listen(PORT, (err: any) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});
