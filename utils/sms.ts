import client from "twilio";

const twilioClient = client(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
);

export const smsSender = (phoneNumber: string) => {
  twilioClient.messages.create({
    body: "Thank you for registering on my website ❤️",
    to: `+63${phoneNumber}`,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
};
