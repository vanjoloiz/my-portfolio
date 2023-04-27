import express from "express";
import passport from "passport";
import LinkedInStrategy from "passport-linkedin-oauth2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Profile from "../models/Profile";
import { CALLBACK_URL } from "../utils/callbackUrl";

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
      callbackURL: CALLBACK_URL,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    (accessToken: string, refreshToken: string, profile, done) => {
      process.nextTick(async () => {
        try {
          let user;

          const linkedInEmail = profile.emails[0].value;

          user = await Profile.findOne({ username: linkedInEmail });

          userId = user!._id.toString();

          if (user) {
            return done(null, profile);
          }

          user = new Profile({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: linkedInEmail,
            password:
              "$2b$10$PQg4LM9Pu1Rnk/nj1j3pf.reqVFjWOhIhADGui/0VisKkhnofWHTC",
            confirmPassword:
              "$2b$10$PQg4LM9Pu1Rnk/nj1j3pf.reqVFjWOhIhADGui/0VisKkhnofWHTC",
          });

          user.password = await bcrypt.hash(user.password, 10);
          user.confirmPassword = undefined;

          await user.save();

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
        expiresIn: "2d",
      });

      res.cookie("token", token);

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  })(req, res, next);
});

export default router;
