import { useState, useEffect } from "react";
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
import Layout from "@/components/v1/Layout";
import { useThemeStore } from "../lib/useThemeStore";
import HeadTags from "@/components/v1/HeadTags";
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

  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);

  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const muiTheme = createTheme({
    palette: {
      mode,
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
    ctx.pathname === "/create-review" ||
    ctx.pathname === "/admin/reviews" ||
    ctx.pathname === "/edit-review/[id]";

  const adminProtectedRoutes = ctx.pathname === "/admin/reviews";

  let user;

  if (!token) {
    if (protectedRoutes) {
      if (ctx?.req) {
        if (ctx.pathname === "/create-review") {
          ctx.res?.writeHead(302, {
            Location: "/login?redirect=create-review",
          });
          ctx.res?.end();
        } else {
          ctx.res?.writeHead(302, { Location: "/login" });
          ctx.res?.end();
        }
      } else {
        if (ctx.pathname === "/create-review") {
          Router.push("/login?redirect=create-review");
        } else {
          Router.push("/login");
        }
      }
    }
  } else {
    if (!protectedRoutes && ctx.pathname !== "/") {
      if (ctx.req) {
        ctx.res?.writeHead(302, { location: "/" });
        ctx.res?.end();
      } else {
        Router.push("/");
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
          ctx.res?.writeHead(302, { Location: "/" });
          ctx.res?.end();
        } else {
          Router.push("/");
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
