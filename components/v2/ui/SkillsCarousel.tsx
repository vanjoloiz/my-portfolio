import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Box from "@mui/material/Box";
import JavascriptLogo from "@/assets/svg/javascript.svg";
import TypeScriptLogo from "@/assets/svg/typescript.svg";
import Html5Logo from "@/assets/svg/html5.svg";
import Css3Logo from "@/assets/svg/css3.svg";
import ReactLogo from "@/assets/svg/react-svgrepo-com.svg";
import NextjsLogo from "@/assets/svg/nextjs.svg";
import ApolloLogo from "@/assets/svg/apollo.svg";
import ReduxLogo from "@/assets/svg/redux.svg";
import MUILogo from "@/assets/svg/mui.svg";
import BootstrapLogo from "@/assets/svg/bootstrap.svg";
import AntdLogo from "@/assets/svg/ant-design-svgrepo-com.svg";
import NodeJsLogo from "@/assets/svg/nodejs.svg";
import ExpressLogo from "@/assets/svg/express-svgrepo-com.svg";
import MongodbLogo from "@/assets/svg/mongodb.svg";
import PostGresLogo from "@/assets/svg/postgres.svg";
import HerokuLogo from "@/assets/svg/heroku.svg";
import GraphQLLogo from "@/assets/svg/graphql.svg";
import RestLogo from "@/assets/svg/rest.svg";
import NestJSLogo from "@/assets/svg/nestjs.svg";
import DenoLogo from "@/assets/svg/deno.svg";
import SCSSLogo from "@/assets/svg/scss.svg";
import SocketIOLogo from "@/assets/svg/socket-io-svgrepo-com.svg";
import FastifyLogo from "@/assets/svg/fastify-icon-svgrepo-com.svg";
import DockerLogo from "@/assets/svg/docker-svgrepo-com.svg";
import TailwindCss from "@/assets/svg/tailwind-svgrepo-com.svg";
import { useThemeStore } from "../../../lib/useThemeStore";

const options = {
  speed: 0.5,
  stopOnInteraction: false,
  stopOnMouseEnter: false,
  stopOnFocusIn: false,
};

const SkillsCarousel = () => {
  const [emblaRef1] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      ...options,
      direction: "backward",
    }),
  ]);

  const [emblaRef2] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      ...options,
      direction: "forward",
    }),
  ]);

  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);

  return (
    <Box
      sx={{
        bgcolor: "background.secondary",
        position: "relative",
        width: { md: "100vw", lg: "75vw" },
        py: { xs: 5, lg: 8 },
        mb: 1.5,
      }}
    >
      <div className="skills-carousel">
        <div className="skills-carousel-viewport" ref={emblaRef1}>
          <div
            className="skills-carousel-container"
            style={{ marginBottom: "60px" }}
          >
            <div className="skills-carousel-slide">
              <JavascriptLogo />
            </div>

            <div className="skills-carousel-slide">
              <TypeScriptLogo />
            </div>

            <div className="skills-carousel-slide">
              <Html5Logo />
            </div>

            <div className="skills-carousel-slide">
              <Css3Logo />
            </div>

            <div className="skills-carousel-slide">
              <ReactLogo />
            </div>

            <div className="skills-carousel-slide">
              <NextjsLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="skills-carousel-slide">
              <MUILogo />
            </div>

            <div className="skills-carousel-slide">
              <AntdLogo />
            </div>

            <div className="skills-carousel-slide">
              <BootstrapLogo />
            </div>

            <div className="skills-carousel-slide">
              <ApolloLogo />
            </div>

            <div className="skills-carousel-slide">
              <ReduxLogo />
            </div>

            <div className="skills-carousel-slide">
              <TailwindCss />
            </div>

            <div className="skills-carousel-slide">
              <SCSSLogo />
            </div>
          </div>
        </div>

        <div className="skills-carousel-viewport" ref={emblaRef2}>
          <div className="skills-carousel-container">
            <div className="skills-carousel-slide">
              <NodeJsLogo />
            </div>

            <div className="skills-carousel-slide">
              <ExpressLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="skills-carousel-slide">
              <FastifyLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="skills-carousel-slide">
              <NestJSLogo />
            </div>

            <div className="skills-carousel-slide">
              <GraphQLLogo />
            </div>

            <div className="skills-carousel-slide">
              <RestLogo />
            </div>

            <div className="skills-carousel-slide">
              <MongodbLogo />
            </div>

            <div className="skills-carousel-slide">
              <PostGresLogo />
            </div>

            <div className="skills-carousel-slide">
              <SocketIOLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="skills-carousel-slide">
              <DenoLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="skills-carousel-slide">
              <DockerLogo />
            </div>

            <div className="skills-carousel-slide">
              <HerokuLogo />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillsCarousel;
