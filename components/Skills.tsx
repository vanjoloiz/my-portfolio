import React, { FC, Fragment, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import useAnimate from "@/lib/useAnimate";
import srcImage from "../public/dev2-image.jpeg";
import { Container } from "@mui/material";
import { skills } from "@utils/skillsLogo";

const Skills: FC = () => {
  const theme = useTheme();

  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const align = lgDown ? "center" : "flex-end";
  const textAlign = lgDown ? "center" : "right";
  const justify = lgDown ? "center" : "flex-end";

  const animRef = useRef(null);
  const animate = useAnimate(animRef);

  return (
    <Container maxWidth="lg" component="div">
      <Box pb={35}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={5}>
            <Hidden lgDown>
              <Fade in={animate} style={{ transitionDelay: "100ms" }}>
                <div>
                  <Image
                    src={srcImage}
                    width={500}
                    height={500}
                    alt="Image"
                    priority
                    placeholder="blur"
                    blurDataURL="./dev2-image.jpeg"
                  />
                </div>
              </Fade>
            </Hidden>

            {lgDown && (
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                align="center"
              >
                Skills
              </Typography>
            )}
          </Grid>
          <Grid
            container
            item
            lg={7}
            direction="column"
            alignItems={align}
            ref={animRef}
          >
            <Grid item alignItems="center" sx={{ marginBottom: "32px" }}>
              <Typography paragraph sx={{ fontSize: "42px" }} align={textAlign}>
                Languages known
              </Typography>
              <Grid
                container
                item
                spacing={1}
                direction="row"
                justifyContent={justify}
              >
                {skills.languageKnown.map((skill) => (
                  <Fragment key={skill.transitionDelay}>
                    <Grid item>
                      <Zoom
                        in={animate}
                        style={{
                          transitionDelay: `${150 * skill.transitionDelay}ms`,
                        }}
                      >
                        <Tooltip title={skill.title}>{skill.logo}</Tooltip>
                      </Zoom>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Grid>

            <Grid item alignItems="center" sx={{ marginBottom: "32px" }}>
              <Typography paragraph align={textAlign} sx={{ fontSize: "42px" }}>
                Frontend
              </Typography>

              <Grid
                container
                item
                spacing={1}
                direction="row"
                justifyContent={justify}
              >
                {skills.frontEnd.map((skill) => (
                  <Fragment key={skill.transitionDelay}>
                    <Grid item>
                      <Zoom
                        in={animate}
                        style={{
                          transitionDelay: `${150 * skill.transitionDelay}ms`,
                        }}
                      >
                        <Tooltip title={skill.title}>{skill.logo}</Tooltip>
                      </Zoom>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Grid>

            <Grid item alignItems="center">
              <Typography paragraph sx={{ fontSize: "42px" }} align={textAlign}>
                Backend, Database and Cloud
              </Typography>
              <Grid
                container
                item
                spacing={1}
                direction="row"
                justifyContent={justify}
              >
                {skills.backEnd.map((skill) => (
                  <Fragment key={skill.transitionDelay}>
                    <Grid item>
                      <Zoom
                        in={animate}
                        style={{
                          transitionDelay: `${150 * skill.transitionDelay}ms`,
                        }}
                      >
                        <Tooltip title={skill.title}>{skill.logo}</Tooltip>
                      </Zoom>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Skills;
