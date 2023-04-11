import { FC, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import JavascriptLogo from "@/assets/javascript.svg";
import TypeScriptLogo from "@/assets/typescript.svg";
import Html5Logo from "@/assets/html5.svg";
import Css3Logo from "@/assets/css3.svg";
import ReactLogo from "@/assets/react.svg";
import NextjsLogo from "@/assets/nextjs.svg";
import ApolloLogo from "@/assets/apollo.svg";
import ReduxLogo from "@/assets/redux.svg";
import MUILogo from "@/assets/mui.svg";
import BootstrapLogo from "@/assets/bootstrap.svg";
import AntdLogo from "@/assets/antd.svg";
import NodeJsLogo from "@/assets/nodejs.svg";
import ExpressLogo from "@/assets/express.svg";
import MongodbLogo from "@/assets/mongodb.svg";
import PostGresLogo from "@/assets/postgres.svg";
import HerokuLogo from "@/assets/heroku.svg";
import GraphQLLogo from "@/assets/graphql.svg";
import RestLogo from "@/assets/rest.svg";
import NestJSLogo from "@/assets/nestjs.svg";
import DenoLogo from "@/assets/deno.svg";
import SCSSLogo from "@/assets/scss.svg";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import useAnimate from "@/lib/useAnimate";
import srcImage from "../public/dev2-image.jpeg";
import { Container } from "@mui/material";

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
              <Typography variant="h1" gutterBottom align="center">
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
                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 0}ms` }}
                  >
                    <Tooltip title="Javascript">
                      <JavascriptLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 1}ms` }}
                  >
                    <Tooltip title="Typescript">
                      <TypeScriptLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 2}ms` }}
                  >
                    <Tooltip title="HTML">
                      <Html5Logo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 3}ms` }}
                  >
                    <Tooltip title="CSS">
                      <Css3Logo />
                    </Tooltip>
                  </Zoom>
                </Grid>
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
                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 4}ms` }}
                  >
                    <Tooltip title="React">
                      <ReactLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 5}ms` }}
                  >
                    <Tooltip title="Next.js">
                      <NextjsLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 6}ms` }}
                  >
                    <Tooltip title="Apollo Client">
                      <ApolloLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 7}ms` }}
                  >
                    <Tooltip title="Redux">
                      <ReduxLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 8}ms` }}
                  >
                    <Tooltip title="Material UI">
                      <MUILogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 9}ms` }}
                  >
                    <Tooltip title="Bootstrap">
                      <BootstrapLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 10}ms` }}
                  >
                    <Tooltip title="Ant Design">
                      <AntdLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 11}ms` }}
                  >
                    <Tooltip title="SCSS">
                      <SCSSLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>
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
                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 12}ms` }}
                  >
                    <Tooltip title="Node.js">
                      <NodeJsLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Tooltip title="Express.js">
                    <Zoom
                      in={animate}
                      style={{ transitionDelay: `${150 * 13}ms` }}
                    >
                      <ExpressLogo />
                    </Zoom>
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 14}ms` }}
                  >
                    <Tooltip title="Nest.js">
                      <NestJSLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 15}ms` }}
                  >
                    <Tooltip title="Deno">
                      <DenoLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 16}ms` }}
                  >
                    <Tooltip title="MongoDB">
                      <MongodbLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 17}ms` }}
                  >
                    <Tooltip title="Postgres">
                      <PostGresLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 18}ms` }}
                  >
                    <Tooltip title="REST API">
                      <RestLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 19}ms` }}
                  >
                    <Tooltip title="GraphQL API">
                      <GraphQLLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>

                <Grid item>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * 20}ms` }}
                  >
                    <Tooltip title="Heroku">
                      <HerokuLogo />
                    </Tooltip>
                  </Zoom>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Skills;
