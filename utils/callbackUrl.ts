export const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://salvadorloizjr.onrender.com/auth/linkedin/callback"
    : "http://localhost:3000/auth/linkedin/callback";
