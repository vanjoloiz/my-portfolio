import express from "express";
import { Request, Response } from "express";
import { sendToAdminEmail } from "../utils/sendEmail";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const options = {
      replyTo: email,
      subject: "Message from my website",
      text: message,
      html: `<p>Hi Vanjo!</p>
      <p>I am ${firstName} ${lastName}</p>
      <p>${message}</p>
    `,
    };

    sendToAdminEmail(options);

    res.status(200).send("Email sent.");
  } catch (err) {
    res.status(500).send("Email sending failed.");
    console.error(err);
  }
});

export default router;
