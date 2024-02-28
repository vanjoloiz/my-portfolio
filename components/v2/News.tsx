import Typography from "@mui/material/Typography";
import HeadTags from "./HeadTags";

const News = () => {
  return (
    <>
      <HeadTags title="News" />
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
