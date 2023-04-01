import type { NextPage } from "next";
import NavBar from "@/components/NavBar";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Container from "@mui/material/Container";
import axios from "axios";
import { BASE_URL } from "@utils/baseUrl";

const Home: NextPage = ({ user, reviews }: any) => {
  return (
    <>
      <NavBar isLoggedIn={user} />
      <main>
        <Container>
          <Landing />
          <Skills />
          <Projects />
          <Reviews reviewsInitialValue={reviews} />
          <Footer />
        </Container>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/review?pageNumber=1`);

  return {
    props: {
      reviews: data,
    },
  };
};

export default Home;
