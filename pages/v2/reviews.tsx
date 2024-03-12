import LandingPage from "@/components/v2/LandingPage";
import axios from "axios";
import { Review } from "@interfaces/Review";

import { BASE_URL } from "@utils/baseUrl";

const Reviews = ({ reviews, user }: any) => {
  return <LandingPage reviews={reviews} user={user} />;
};

export default Reviews;

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
