import { SWRConfig } from "swr";
import Router from "next/router";
import { parseCookies } from "nookies";
import axios from "axios";
import Cookie from "js-cookie";
import { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createEmotionCache from "@/lib/createEmotionCache";
import { BASE_URL } from "@utils/baseUrl";
import Layout from "@/components/v2/Layout";
import HeadTags from "@/components/v2/HeadTags";
import "../styles/main.css";

const clientSideEmotionCache = createEmotionCache();

const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: Cookie.get("token") } })
    .then((res) => res.data);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      mode: "dark",
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  return (
    <CacheProvider value={emotionCache}>
      <HeadTags />
      <SWRConfig value={{ fetcher }}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const { token } = parseCookies(ctx);

  const protectedRoutes =
    ctx.pathname === "/v2/create-review" ||
    ctx.pathname === "/v2/admin/reviews" ||
    ctx.pathname === "/v2//edit-review/[id]" ||
    ctx.pathname === "/v2/welcome";

  const adminProtectedRoutes = ctx.pathname === "/v2/admin/reviews";

  let user;

  if (!ctx.pathname.includes("/v2")) {
    if (ctx?.req) {
      ctx.res?.writeHead(302, {
        Location: "/v2",
      });
      ctx.res?.end();
    } else {
      Router.push("/v2");
    }
  }

  if (!token) {
    if (protectedRoutes) {
      if (ctx?.req) {
        if (ctx.pathname === "/v2/create-review") {
          ctx.res?.writeHead(302, {
            Location: "/v2/login?redirect=create-review",
          });
          ctx.res?.end();
        } else {
          ctx.res?.writeHead(302, { Location: "/v2/login" });
          ctx.res?.end();
        }
      } else {
        if (ctx.pathname === "/create-review") {
          Router.push("/v2/login?redirect=create-review");
        } else {
          Router.push("/v2/login");
        }
      }
    }
  } else {
    if (ctx.pathname === "/v2/login" || ctx.pathname === "/v2/sign-up") {
      if (ctx?.req) {
        ctx.res?.writeHead(302, { location: "/v2" });
        ctx.res?.end();
      } else {
        Router.push("/v2");
      }
    }

    const { data } = await axios.get(`${BASE_URL}/api/v1/auth`, {
      headers: {
        Authorization: token,
      },
    });

    if (adminProtectedRoutes) {
      if (!data.isAdmin) {
        if (ctx?.req) {
          ctx.res?.writeHead(302, { Location: "/v2" });
          ctx.res?.end();
        } else {
          Router.push("/v2");
        }
      }
    }

    user = data;
  }

  return {
    pageProps: {
      user,
    },
  };
};
