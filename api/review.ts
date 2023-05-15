import express from "express";
import apicache from "apicache";
import { Request } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";
import Review from "../models/Review";

interface CustomRequest extends Request {
  userId?: string;
}

const router = express.Router();

const cache = apicache.middleware;

router.get("/", cache("5 minutes"), async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const reviews = await Review.find({ isApproved: true })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-updatedAt")
    .populate(
      "profile",
      "firstName lastName linkedInProfilePicUrl linkedInProfileUrl"
    );

  return res.status(201).json(reviews);
});

router.get(
  "/admin",
  cache("5 minutes"),
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const reviews = await Review.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort("-updatedAt")
      .populate(
        "profile",
        "firstName lastName linkedInProfilePicUrl linkedInProfileUrl"
      );

    return res.status(201).json(reviews);
  }
);

router.post("/", authMiddleware, async (req: CustomRequest, res) => {
  const { text } = req.body;

  try {
    const review = await new Review({
      profile: req.userId,
      text,
    }).save();

    apicache.clear("");

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

      await review?.save();

      apicache.clear("");

      res.status(200).json(review);
    } catch (err) {
      console.error(err);
    }
  }
);

router.put(
  "/edit/:reviewId",
  authMiddleware,
  async (req: CustomRequest, res) => {
    const { reviewId } = req.params;

    const { text } = req.body;

    try {
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(401).json("Review ID not found.");
      }

      if (req.userId === String(review.profile)) {
        res.status(401).json("This review is not yours.");
      }

      review.text = text;
      review.isApproved = false;

      res.status(200).json(review);
    } catch (err) {
      console.error(err);
    }
  }
);

export default router;
