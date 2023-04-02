import { FC } from "react";
import Fade from "@mui/material/Fade";
import Typed from "react-typed";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import LinkedInLogo from "@/assets/linkedin.svg";
import FacebookLogo from "@/assets/facebook.svg";
import GithubLogo from "@/assets/github.svg";
import Link from "@mui/material/Link";
import Hidden from "@mui/material/Hidden";
import srcImage from "../public/dev-image.jpeg";

const Landing: FC = () => {
  return (
    <Box mt={25} pb={35}>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h1" gutterBottom>
            Hi, I&apos;m Salvador
          </Typography>
          <Typed
            style={{ fontSize: "32px" }}
            strings={[
              "Full-stack Developer. 🌐",
              "Love JavaScript Development. 🚀",
              "React Developer. ⚛️",
              "Node.js Developer. 💻",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
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
          </div>
        </Grid>
        <Grid item md={6}>
          <Hidden lgDown>
            <Fade in={true} style={{ transitionDelay: "100ms" }}>
              <div>
                <Image
                  src={srcImage}
                  width={600}
                  height={500}
                  alt="Image"
                  placeholder="blur"
                  blurDataURL="./dev-image.jpeg"
                  priority
                />
              </div>
            </Fade>
          </Hidden>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
