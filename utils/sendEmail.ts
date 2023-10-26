import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid";
import pug from "pug";
import juice from "juice";
import { SENDGRID_API_EMAIL, GMAIL_EMAIL } from "../utils/emailConstants";

interface EmailOptions {
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
}

const transporter = nodemailer.createTransport(
  sendGridTransport({
    apiKey: process.env.SENDGRID_API_KEY!,
  })
);

export const sendToAdminEmail = async (emailOptions: EmailOptions) => {
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

export const sendWelcomeEmail = async (firstName: string, email: string) => {
  const html = pug.renderFile(`${__dirname}/templates/thankYouEmail.pug`, {
    firstName,
  });

  try {
    await transporter.sendMail({
      from: SENDGRID_API_EMAIL,
      to: email,
      replyTo: process.env.GMAIL_EMAIL,
      subject: "Thank You for Registering on My Portfolio Website",
      html: juice(html),
    });
  } catch (err) {
    console.error(err);
  }
};
