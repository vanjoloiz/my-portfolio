import { FC } from "react";
import LandingPage from "@/components/v2/LandingPage";
import { User } from "@interfaces/User";

interface HomePageProps {
  user: User;
}

const Home: FC<HomePageProps> = ({ user }: any) => {
  return <LandingPage user={user} />;
};

export default Home;
