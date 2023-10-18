import JavascriptLogo from "@/assets/svg/javascript.svg";
import TypeScriptLogo from "@/assets/svg/typescript.svg";
import Html5Logo from "@/assets/svg/html5.svg";
import Css3Logo from "@/assets/svg/css3.svg";
import ReactLogo from "@/assets/svg/react.svg";
import NextjsLogo from "@/assets/svg/nextjs.svg";
import ApolloLogo from "@/assets/svg/apollo.svg";
import ReduxLogo from "@/assets/svg/redux.svg";
import MUILogo from "@/assets/svg/mui.svg";
import BootstrapLogo from "@/assets/svg/bootstrap.svg";
import AntdLogo from "@/assets/svg/antd.svg";
import NodeJsLogo from "@/assets/svg/nodejs.svg";
import ExpressLogo from "@/assets/svg/express.svg";
import MongodbLogo from "@/assets/svg/mongodb.svg";
import PostGresLogo from "@/assets/svg/postgres.svg";
import HerokuLogo from "@/assets/svg/heroku.svg";
import GraphQLLogo from "@/assets/svg/graphql.svg";
import RestLogo from "@/assets/svg/rest.svg";
import NestJSLogo from "@/assets/svg/nestjs.svg";
import DenoLogo from "@/assets/svg/deno.svg";
import SCSSLogo from "@/assets/svg/scss.svg";

export const skills = {
  languageKnown: [
    {
      logo: <JavascriptLogo />,
      transitionDelay: 0,
      title: "Javascript",
    },
    {
      logo: <TypeScriptLogo />,
      transitionDelay: 1,
      title: "TypeScript",
    },
    { logo: <Html5Logo />, transitionDelay: 2, title: "HTML" },
    { logo: <Css3Logo />, transitionDelay: 3, title: "CSS" },
  ],

  frontEnd: [
    {
      logo: <ReactLogo />,
      transitionDelay: 5,
      title: "React",
    },

    {
      logo: <NextjsLogo />,
      transitionDelay: 6,
      title: "Next.js",
    },

    {
      logo: <ApolloLogo />,
      transitionDelay: 7,
      title: "Apollo Client",
    },

    {
      logo: <ReduxLogo />,
      transitionDelay: 8,
      title: "Redux",
    },

    {
      logo: <MUILogo />,
      transitionDelay: 9,
      title: "MUI",
    },

    {
      logo: <BootstrapLogo />,
      transitionDelay: 10,
      title: "Bootstrap",
    },

    {
      logo: <AntdLogo />,
      transitionDelay: 11,
      title: "Ant Design",
    },

    {
      logo: <SCSSLogo />,
      transitionDelay: 12,
      title: "CSS",
    },
  ],

  backEnd: [
    {
      logo: <NodeJsLogo />,
      transitionDelay: 13,
      title: "Node.js",
    },

    {
      logo: <ExpressLogo />,
      transitionDelay: 14,
      title: "Express.js",
    },

    {
      logo: <NestJSLogo />,
      transitionDelay: 15,
      title: "Nest.js",
    },

    {
      logo: <DenoLogo />,
      transitionDelay: 16,
      title: "Deno",
    },

    {
      logo: <MongodbLogo />,
      transitionDelay: 17,
      title: "MongoDB",
    },

    {
      logo: <PostGresLogo />,
      transitionDelay: 18,
      title: "Postgres",
    },

    {
      logo: <RestLogo />,
      transitionDelay: 19,
      title: "REST API",
    },

    {
      logo: <GraphQLLogo />,
      transitionDelay: 20,
      title: "GraphQL API",
    },

    {
      logo: <HerokuLogo />,
      transitionDelay: 21,
      title: "Heroku",
    },
  ],
};
