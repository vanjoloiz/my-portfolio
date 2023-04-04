import { FC, ReactNode } from "react";
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

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={user?.isAdmin} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
