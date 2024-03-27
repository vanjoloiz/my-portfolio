import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Grid from "@mui/material/Grid";
import ColorThemeButton from "./ColorThemeButton";
import AboutSecondSection from "./ui/AboutSecondSection";
import Banner from "./ui/Banner";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

interface LayoutProps {
  children: ReactNode;
  user?: User;
}

const Layout: FC<LayoutProps> = ({ children, user }) => {
  const isLoggedIn = user !== undefined;

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const router = useRouter();

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });

  const handleBannerCloseClick = () => setIsBannerOpen(false);

  return (
    <>
      <NavBar user={user} isLoggedIn={isLoggedIn} isAdmin={user?.isAdmin} />
      <main>
        <Grid container>
          <Grid
            item
            md={12}
            lg={3}
            sx={{
              bgcolor: "background.secondary",
              display: { xs: "none", lg: "block" },
            }}
          >
            <SideNav user={user} />
          </Grid>

          <Grid item xs={12} lg={8.6} sx={{ bgcolor: "background.main" }}>
            {children}
            {router.pathname === "/v2/about" && <AboutSecondSection />}
          </Grid>

          <Grid
            item
            lg={0.4}
            sx={{
              bgcolor: "background.main",
              display: { xs: "none", lg: "block" },
            }}
          >
            <ColorThemeButton />
          </Grid>
        </Grid>
        {router.pathname === "/v2/reviews" && !isLoggedIn && (
          <Banner
            isOpen={isBannerOpen}
            message="You can create review by logging in."
            onBannerClose={handleBannerCloseClick}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
