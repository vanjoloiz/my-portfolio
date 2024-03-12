import LandingPage from "@/components/v2/LandingPage";
import axios from "axios";

import { BASE_URL } from "@utils/baseUrl";

const News = ({ user, news }: any) => {
  return <LandingPage user={user} news={news} />;
};

export default News;

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/news?page=1`);

  return {
    props: {
      reviews: data,
    },
  };
};
