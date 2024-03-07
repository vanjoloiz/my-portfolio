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
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef1}>
          <div className="embla__container">
            <div className="embla__slide">
              <JavascriptLogo />
            </div>

            <div className="embla__slide">
              <TypeScriptLogo />
            </div>

            <div className="embla__slide">
              <Html5Logo />
            </div>

            <div className="embla__slide">
              <Css3Logo />
            </div>

            <div className="embla__slide">
              <ReactLogo />
            </div>

            <div className="embla__slide">
              <NextjsLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="embla__slide">
              <MUILogo />
            </div>

            <div className="embla__slide">
              <AntdLogo />
            </div>

            <div className="embla__slide">
              <BootstrapLogo />
            </div>

            <div className="embla__slide">
              <ApolloLogo />
            </div>

            <div className="embla__slide">
              <ReduxLogo />
            </div>

            <div className="embla__slide">
              <TailwindCss />
            </div>

            <div className="embla__slide">
              <SCSSLogo />
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className="embla__viewport" ref={emblaRef2}>
          <div className="embla__container">
            <div className="embla__slide">
              <NodeJsLogo />
            </div>

            <div className="embla__slide">
              <ExpressLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="embla__slide">
              <FastifyLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="embla__slide">
              <NestJSLogo />
            </div>

            <div className="embla__slide">
              <GraphQLLogo />
            </div>

            <div className="embla__slide">
              <RestLogo />
            </div>

            <div className="embla__slide">
              <MongodbLogo />
            </div>

            <div className="embla__slide">
              <PostGresLogo />
            </div>

            <div className="embla__slide">
              <SocketIOLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="embla__slide">
              <DenoLogo style={{ fill: isDarkMode ? "white" : "black" }} />
            </div>

            <div className="embla__slide">
              <DockerLogo />
            </div>

            <div className="embla__slide">
              <HerokuLogo />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillsCarousel;
