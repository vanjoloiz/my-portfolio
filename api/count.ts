import express from "express";
import Count from "../models/Count";

const router = express.Router();

router.get("/", async (req, res) => {
  const count = await Count.find();

  res.status(200).json(count);
});

router.post("/:userId/:ipAddress", async (req, res) => {
  try {
    await new Count({
      userId: req.params.userId,
      ipAddress: req.params.ipAddress,
    }).save();

    const count = await Count.countDocuments();

    res.status(200).json(count);
  } catch (err: any) {
    if (err.code === 11000) {
      return;
    }
  }
});

router.delete("/:userId", async (req, res) => {
  await Count.findOneAndDelete({ userId: req.params.userId });

  const count = await Count.countDocuments();

  res.status(200).json(count);
});

export default router;
