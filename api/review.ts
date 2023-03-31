import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";
import Review from "../models/Review";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const reviews = await Review.find({ isApproved: true })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-updatedAt")
    .populate("profile", "firstName lastName");

  return res.status(201).json(reviews);
});

router.get("/admin", authMiddleware, adminMiddleware, async (req, res) => {
  const reviews = await Review.find().populate("profile", "firstName lastName");

  return res.status(201).json(reviews);
});

router.post("/", authMiddleware, async (req: any, res: any) => {
  const { text } = req.body;

  try {
    const review = await new Review({
      profile: req.userId,
      text,
    }).save();

    return res.status(201).json(review);
  } catch (err) {
    console.error(err);
  }
});

router.put(
  "/approved/:reviewId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { reviewId } = req.params;

    try {
      const review = await Review.findById(reviewId);

      review!.isApproved = true;

      res.status(200).json(review);
    } catch (err) {
      console.error(err);
    }
  }
);

router.put("/edit/:reviewId", authMiddleware, async (req: any, res: any) => {
  const { reviewId } = req.params;

  const { text } = req.body;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(401).json("Review ID not found.");
    }

    if (req.userId === review!.profile) {
      res.status(401).json("This review is not yours.");
    }

    review.text = text;

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
  }
});

export default router;
