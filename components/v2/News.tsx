import Typography from "@mui/material/Typography";
import MetaTags from "./MetaTags";

const News = () => {
  return (
    <>
      <MetaTags title="News" />
      <Typography
        align="center"
        sx={{
          typography: { xs: "h2", md: "h2" },
          fontWeight: "bold !important",
        }}
      >
        Coming Soon!
      </Typography>
    </>
  );
};

export default News;
