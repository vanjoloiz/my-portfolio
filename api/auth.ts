import express from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware/authMiddleware";
import Profile from "../models/Profile";
import { loginLimiter } from "../utils/limiter";
import { sendEmail } from "../utils/sendEmail";

const router = express.Router();

interface CustomRequest extends Request {
  userId?: string;
}

router.get("/", authMiddleware, async (req: CustomRequest, res) => {
  const user = await Profile.findById(req.userId).select("-password");

  res.status(200).json(user);
});

router.post("/", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Profile.findOne({
      username: username.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send("Invalid login credentials. Please try again.");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res
        .status(401)
        .send("Invalid login credentials. Please try again.");
    }

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Email sending failed.");
  }
});

router.post("/signup", async (req: CustomRequest, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    confirmPassword,
    linkedInProfileUrl,
  } = req.body;

  if (password.length < 8) {
    return res.status(401).send("Password must be at least 8 characters.");
  }

  if (password !== confirmPassword) {
    return res.status(401).send("Passwords must match.");
  }

  if (
    linkedInProfileUrl !== "" &&
    !linkedInProfileUrl.match(
      /^((https?:\/\/)?((www|ww)\.)?linkedin\.com\/)(([\w\d\-&#?=])+\/?){1,}$/
    )
  ) {
    return res.status(400).send("Please provide a valid linkedin profile url.");
  }

  try {
    let user;

    user = await Profile.findOne({ username: username.toLowerCase() });

    if (user) {
      return res.status(409).send("This username already registered.");
    }

    user = new Profile({
      firstName,
      lastName,
      username: username.toLowerCase(),
      password,
      confirmPassword,
      linkedInProfileUrl,
    });

    user.password = await bcrypt.hash(user.password, 10);
    user.confirmPassword = undefined;

    await user.save();

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const options = {
      subject: "New signup from my website",
      html: `<p>New signup</p>
      <p>I am ${firstName} ${lastName}</p>
      ${
        linkedInProfileUrl === ""
          ? ""
          : `
        <a href=${linkedInProfileUrl}>${linkedInProfileUrl}</a>
        `
      }
    `,
    };

    sendEmail(options);

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Email sending failed.");
  }
});

export default router;
