import express from "express";
import * as crypto from "crypto";
import passport from "passport";
import LinkedInStrategy from "passport-linkedin-oauth2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Profile from "../models/Profile";
import { getCallbackUrl, Platform } from "../utils/callbackUrl";
import { sendToAdminEmail, sendWelcomeEmail } from "../utils/sendEmail";

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

let userId: string;

passport.use(
  new LinkedInStrategy.Strategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      callbackURL: getCallbackUrl(Platform.LinkedIn),
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    (accessToken: string, refreshToken: string, profile, done) => {
      process.nextTick(async () => {
        try {
          let user;

          const linkedInEmail = profile.emails[0].value;

          user = await Profile.findOne({
            username: `${linkedInEmail}+linkedIn`,
          });

          if (user) {
            userId = user._id.toString();

            return done(null, profile);
          }

          const generatedPassword = crypto.randomBytes(32).toString("hex");

          user = new Profile({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: `${linkedInEmail}+linkedIn`,
            password: generatedPassword,
            confirmPassword: generatedPassword,
            email: linkedInEmail,
            profilePicUrl: profile.photos[0].value,
          });

          userId = user._id.toString();

          user.password = await bcrypt.hash(user.password, 10);
          user.confirmPassword = undefined;

          await user.save();

          const options = {
            subject: "New signup from my website",
            html: `<p>New signup</p>
            <p>I am ${profile.name.givenName} ${profile.name.familyName}</p>
            <p>With linkedIn</p>
        `,
          };

          sendToAdminEmail(options);

          sendWelcomeEmail(profile.name.givenName, linkedInEmail);

          return done(null, profile);
        } catch (err) {
          console.error(err);
        }

        return done(null, profile);
      });
    }
  )
);

router.get("/auth/linkedin", passport.authenticate("linkedin"));

router.get("/auth/linkedin/callback", (req, res, next) => {
  passport.authenticate("linkedin", (err: any, user: any) => {
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
