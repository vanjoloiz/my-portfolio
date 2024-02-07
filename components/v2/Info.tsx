import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { TypeAnimation } from "react-type-animation";

import GithubLogo from "@/assets/svg/github.svg";
import LinkedInLogo from "@/assets/svg/linkedin.svg";
import FacebookLogo from "@/assets/svg/facebook.svg";

const Info = () => {
  return (
    <>
      <Typography
        gutterBottom
        sx={{
          typography: { xs: "h2", md: "h2" },
          fontWeight: "bold !important",
        }}
      >
        Hi, I&apos;m Salvador
      </Typography>
      <TypeAnimation
        sequence={[
          "Full Stack Developer",
          1000,
          "React Developer",
          1000,
          "Node.js Developer",
          1000,
          "Passionate about coding",
          1000,
        ]}
        wrapper="span"
        speed={20}
        deletionSpeed={80}
        style={{ fontSize: "32px" }}
        repeat={Infinity}
      />

      <Typography mt={2} variant="subtitle1">
        I am a passionate and skilled JavaScript developer with a knack for
        creating dynamic and user-friendly web applications. My journey in the
        world of web development has equipped me with a strong foundation in
        front-end and back-end technologies.
      </Typography>

      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          gap: "10px",

          justifyContent: { xs: "center", lg: "left" },
        }}
      >
        <Link
          href="https://www.linkedin.com/in/salvador-loiz-jr-4b85341a6/"
          target="_blank"
          rel="noopener"
        >
          <LinkedInLogo style={{ width: "50px", height: "50px" }} />
        </Link>
        <Link
          href="https://www.facebook.com/xD.raze01/"
          target="_blank"
          rel="noopener"
        >
          <FacebookLogo style={{ width: "50px", height: "50px" }} />
        </Link>

        <Link
          href="https://github.com/vanjoloiz"
          target="_blank"
          rel="noopener"
        >
          <GithubLogo style={{ width: "50px", height: "50px" }} />
        </Link>
      </Box>
    </>
  );
};

export default Info;
