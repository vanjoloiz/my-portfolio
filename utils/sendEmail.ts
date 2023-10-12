import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid";
import { SENDGRID_API_EMAIL, GMAIL_EMAIL } from "../utils/emailConstants";

interface EmailOptions {
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  const transporter = nodemailer.createTransport(
    sendGridTransport({
      apiKey: process.env.SENDGRID_API_KEY!,
    })
  );

  try {
    await transporter.sendMail({
      from: SENDGRID_API_EMAIL,
      to: GMAIL_EMAIL,
      replyTo: emailOptions.replyTo,
      subject: emailOptions.subject,
      text: emailOptions.text,
      html: emailOptions.html,
    });
  } catch (err) {
    console.error(err);
  }
};
