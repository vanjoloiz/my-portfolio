import express from "express";
import passport from "passport";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import GitHubStrategy from "passport-github2";
import Profile from "../models/Profile";
import { getCallbackUrl, Platform } from "../utils/callbackUrl";

const router = express.Router();

let userId: string;

passport.use(
  new GitHubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: getCallbackUrl(Platform.Github),
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let user;

        const githubEmail = profile.emails[0].value;

        user = await Profile.findOne({ username: `${githubEmail}+github` });

        if (user) {
          userId = user._id.toString();

          return done(null, profile);
        }

        const generatedPassword = crypto.randomBytes(32).toString("hex");

        user = new Profile({
          firstName: profile.displayName,
          lastName: "",
          username: `${githubEmail}+github`,
          password: generatedPassword,
          confirmPassword: generatedPassword,
          profilePicUrl: profile.photos[0].value,
          profileUrl: profile.profileUrl,
        });

        userId = user._id.toString();

        user.password = await bcrypt.hash(user.password, 10);
        user.confirmPassword = undefined;

        await user.save();
      } catch (err) {
        console.error(err);
      }

      return done(null, profile);
    }
  )
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/auth/github/callback", (req, res, next) => {
  passport.authenticate("github", (err: any, user: any) => {
    if (user) {
      const payload = { userId };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  })(req, res, next);
});

export default router;
