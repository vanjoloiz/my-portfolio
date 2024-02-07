import Typography from "@mui/material/Typography";
import MetaTags from "./MetaTags";

const About = () => {
  return (
    <>
      <MetaTags title="About" />
      <Typography
        align="center"
        sx={{
          typography: { xs: "h2", md: "h2" },
          fontWeight: "bold !important",
        }}
      >
        Coming Soon!
      </Typography>
    </>
  );
};

export default About;
