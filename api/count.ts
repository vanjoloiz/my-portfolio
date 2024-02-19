import express from "express";
import Count from "../models/Count";

const router = express.Router();

router.get("/", async (req, res) => {
  const count = await Count.find();

  res.status(200).json(count);
});

router.post("/:userId", async (req, res) => {
  try {
    const count = await new Count({
      userId: req.params.userId,
    }).save();

    res.status(200).json(count);
  } catch (err: any) {
    if (err.code === 11000) {
      return;
    }
  }
});

router.delete("/:userId", async (req, res) => {
  const count = await Count.findOneAndDelete({ userId: req.params.userId });

  res.status(200).json(count);
});

export default router;
