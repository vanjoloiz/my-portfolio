import { FC, ReactNode, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { Grid } from "@mui/material";

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
  // eslint-disable-next-line
  const [connectedUsers, setConnectedUsers] = useState([]);

  const isLoggedIn = user !== undefined;

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });

  return (
    <>
      <NavBar user={user} isLoggedIn={isLoggedIn} isAdmin={user?.isAdmin} />
      <main>
        <Grid container>
          <Grid
            item
            md={12}
            lg={4}
            sx={{
              bgcolor: "#000000",
              display: { xs: "none", lg: "block" },
            }}
          >
            <SideNav user={user} />
          </Grid>

          <Grid item xs={12} lg={8}>
            {children}
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Layout;
