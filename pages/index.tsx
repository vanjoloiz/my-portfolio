import { FC } from "react";
import axios from "axios";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Container from "@mui/material/Container";

import { BASE_URL } from "@utils/baseUrl";

interface Review {
  _id: string;
  profile: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  text: string;
  updatedAt: string;
}

interface ReviewProps {
  reviewsInitialValue: Review[][];
}

const Home: FC<ReviewProps> = ({ reviewsInitialValue: reviews }) => {
  return (
    <Container>
      <Landing />
      <Skills />
      <Projects />
      <Reviews reviewsInitialValue={reviews} />
    </Container>
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
