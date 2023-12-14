import express from "express";
import * as crypto from "crypto";
import { Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware/authMiddleware";
import Profile from "../models/Profile";
import { loginLimiter } from "../utils/limiter";
import {
  sendToAdminEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
} from "../utils/sendEmail";
import { smsSender } from "../utils/sms";
import { BASE_URL } from "../utils/baseUrl";

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
    profileUrl,
    phoneNumber,
    email,
  } = req.body;

  if (password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters.");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords must match.");
  }

  if (username.length < 5) {
    return res.status(400).send("Username must be at least 5 characters..");
  }

  // /^((https?:\/\/)?((www|ww)\.)?linkedin\.com\/)(([\w\d\-&#?=])+\/?){1,}$/

  if (
    profileUrl !== "" &&
    !profileUrl.match(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
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
      phoneNumber,
      email,
      profileUrl,
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
        profileUrl === ""
          ? ""
          : `
        <a href=${profileUrl}>${profileUrl}</a>
        `
      }
    `,
    };

    sendWelcomeEmail(firstName, email);

    phoneNumber && smsSender(phoneNumber);

    sendToAdminEmail(options);

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Email sending failed.");
  }
});

router.get("/authusername/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Profile.findOne({
      username: username.toLocaleLowerCase(),
    });

    if (user) return res.status(401).send("Username already taken.");

    res.status(200).send("Available.");
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

router.post("/forgot-password", async (req, res) => {
  const { username } = req.body;

  const user = await Profile.findOne({ username });
  try {
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = token;
      user.resetPasswordTokenTimeStamp = Date.now() + 3600000;

      await user.save();

      const passwordResetLink = `${BASE_URL}/forgot-password/${token}`;

      await sendForgotPasswordEmail(
        token,
        user.username,
        user.email,
        passwordResetLink
      );
    } else {
      return res.status(404).json({
        message: "Username not found.",
      });
    }

    res.status(200).json({
      message: "Forgot password email sent.",
      userEmail: user?.email,
    });
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

router.post("/forgot-password/:token", async (req, res) => {
  const { password, confirmPassword } = req.body;

  try {
    const user = await Profile.findOne({
      resetPasswordToken: req.params.token,
    });

    if (user) {
      if (user.resetPasswordTokenTimeStamp! < Date.now()) {
        return res.status(401).send("Token is not valid.");
      }

      const isPasswordSame = await bcrypt.compare(password, user.password);

      if (isPasswordSame)
        return res.status(401).send("Please don't use your old password.");

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenTimeStamp = undefined;

      await user.save();
      res.status(200).send("Password successfully change.");
    } else {
      res.status(401).send("Token is not valid.");
    }
  } catch (err) {
    res.status(500).send("Server error.");
  }
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords must match.");
  }
});

export default router;
