export enum Platform {
  LinkedIn = "linkedin",
  Github = "github",
}

export const getCallbackUrl = (platform: Platform) => {
  return process.env.NODE_ENV === "production"
    ? `https://salvadorloizjr.com/auth/${platform}/callback`
    : `http://localhost:3000/auth/${platform}/callback`;
};
