import { FC, ReactNode } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface User {
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
      <NavBar isLoggedIn={isLoggedIn} isAdmin={user?.isAdmin} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
