import { BASE_URL } from "./baseUrl";

const whitelist = [BASE_URL, "https://salvadorloizjr.onrender.com"];

export const corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export const socketIOCors = {
  cors: {
    origin: [BASE_URL, "https://salvadorloizjr.onrender.com"],
    methods: ["GET", "POST"],
  },
};
