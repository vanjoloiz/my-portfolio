import { FC } from "react";
import axios from "axios";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Container from "@mui/material/Container";
import Contact from "@/components/Contact";
import { Review } from "@interfaces/Review";
import { User } from "@interfaces/User";

import { BASE_URL } from "@utils/baseUrl";

interface HomePageProps {
  reviews: Review[][];
  user: User;
}

const Home: FC<HomePageProps> = ({ reviews: reviewsInitialValue, user }) => {
  return (
    <Container>
      <Landing />
      <Skills />
      <Projects />
      <Reviews reviewsInitialValue={reviewsInitialValue} loggedInUser={user} />
      <Contact />
    </Container>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get<Review[]>(
    `${BASE_URL}/api/v1/review?pageNumber=1`
  );

  return {
    props: {
      reviews: data,
    },
  };
};

export default Home;
