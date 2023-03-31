import type { NextPage } from "next";
import NavBar from "@/components/NavBar";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Container from "@mui/material/Container";

const Home: NextPage = ({ user }: any) => {
  return (
    <>
      <NavBar isLoggedIn={user !== undefined} />
      <main>
        <Container>
          <Landing />
          <Skills />
          <Projects />
          <Reviews />
          <Footer />
        </Container>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
