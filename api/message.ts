import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is a message route!");
});

export default router;
