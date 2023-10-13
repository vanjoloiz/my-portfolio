import { FC } from "react";
import Fade from "@mui/material/Fade";
import Typed from "react-typed";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from "next/image";
import LinkedInLogo from "@/assets/svg/linkedin.svg";
import FacebookLogo from "@/assets/svg/facebook.svg";
import GithubLogo from "@/assets/svg/github.svg";
import Link from "@mui/material/Link";
import Hidden from "@mui/material/Hidden";
import useMediaQuery from "@mui/material/useMediaQuery";
import srcImage from "../public/dev-image.jpeg";

const Landing: FC = () => {
  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.only("xs"));

  const isRemoveHeight = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg">
      <Box pt={25} pb={35}>
        <Grid container>
          <Grid item md={6} justifyContent="center">
            <Typography variant={isMediumScreenSize ? "h2" : "h1"} gutterBottom>
              Hi, I&apos;m Salvador
            </Typography>
            <Typed
              style={{ fontSize: "32px" }}
              strings={[
                "Full stack Developer. 🌐",
                "React Developer. ⚛️",
                "Node js Developer. 💻",
                "Passionate about coding.",
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
          <Grid item md={6} height={!isRemoveHeight ? 500 : undefined}>
            <Hidden mdDown>
              <Fade in={true} style={{ transitionDelay: "100ms" }}>
                <div>
                  <Image
                    src={srcImage}
                    width={550}
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
    </Container>
  );
};

export default Landing;
