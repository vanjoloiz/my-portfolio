import { FC, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FloatingChat from "@/components/FloatingChat";
import { io } from "socket.io-client";
import { BASE_URL } from "@utils/baseUrl";

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

const socket = io(BASE_URL);

const Layout: FC<LayoutProps> = ({ children, user }) => {
  const [isAdminOnline, setIsAdminOnline] = useState(false);

  const { pathname } = useRouter();

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

  useEffect(() => {
    socket.emit("join", { userId: user?._id || uuidv4() });
  }, [user, user?._id]);

  const isShowFloatingChat =
    pathname === "/" && isAdminOnline && !user?.isAdmin;

  useEffect(() => {
    socket.on("connectedUsers", ({ users }) => {
      const isAdminLoggedIn = users.find(
        (user: any) => user.userId === "642654cf90b5bced5ed5dc68"
      );

      if (isAdminLoggedIn) {
        return setIsAdminOnline(true);
      }
      setIsAdminOnline(false);
    });
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={user?.isAdmin} />
      <main>{children}</main>
      <Footer />
      {isShowFloatingChat && <FloatingChat />}
    </>
  );
};

export default Layout;
