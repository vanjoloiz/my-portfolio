import Typography from "@mui/material/Typography";

const Welcome = ({ user }: any) => {
  return (
    <>
      <Typography
        align="center"
        sx={{
          typography: { xs: "h2", md: "h2" },
          fontWeight: "bold !important",
        }}
      >
        Welcome, {user.firstName}!
      </Typography>
    </>
  );
};

export default Welcome;
