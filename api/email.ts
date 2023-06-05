import express from "express";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid";
import { SENDGRID_API_EMAIL, GMAIL_EMAIL } from "../utils/emailConstants";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  const transporter = nodemailer.createTransport(
    sendGridTransport({
      apiKey: process.env.SENDGRID_API_KEY!,
    })
  );

  try {
    await transporter.sendMail({
      from: SENDGRID_API_EMAIL,
      to: GMAIL_EMAIL,
      replyTo: email,
      subject: "Message from my website",
      text: message,
      html: `<p>Hi Vanjo!</p>
             <p>I am ${firstName} ${lastName}</p>
             <p>${message}</p>
      `,
    });

    res.status(200).send("Email sent.");
  } catch (err) {
    res.status(500).send("Email sending failed.");
    console.error(err);
  }
});

export default router;
