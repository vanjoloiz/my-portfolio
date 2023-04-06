import { useState, useMemo } from "react";
import { SWRConfig } from "swr";
import Router from "next/router";
import Head from "next/head";
import { parseCookies } from "nookies";
import axios from "axios";
import Cookie from "js-cookie";
import { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createEmotionCache from "@/lib/createEmotionCache";
import { ColorModeContext } from "@/components/NavBar";
import { BASE_URL } from "@utils/baseUrl";
import Layout from "@/components/Layout";

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

  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#FFFFFF",
          },
          mode,
        },
      }),
    [mode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Salvador Loiz</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="Salvador Loiz portfolio website" content="Salvador Loiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </SWRConfig>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const { token } = parseCookies(ctx);

  const protectedRoutes =
    ctx.pathname === "/create-review" || ctx.pathname === "/admin/reviews";

  const adminProtectedRoutes = ctx.pathname === "/admin/reviews";

  let user;

  if (token === undefined) {
    if (protectedRoutes) {
      if (ctx?.req) {
        ctx.res?.writeHead(302, { Location: "/login" });
        ctx.res?.end();
      } else {
        Router.push("/login?redirect=create-review");
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
