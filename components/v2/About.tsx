import Typography from "@mui/material/Typography";
import HeadTags from "./HeadTags";

const About = () => {
  return (
    <>
      <HeadTags title="About" />
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
