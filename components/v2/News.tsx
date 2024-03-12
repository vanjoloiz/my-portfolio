import { useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import NewsLoading from "./NewsLoading";
import HeadTags from "./HeadTags";
import defaultCardImg from "../../public/javascript.png";

const News = ({ newsProps }: any) => {
  const { data: news, isLoading } = useSWR("/api/v1/news", {
    fallbackData: newsProps,
  });

  const [isShowReadMoreButton, setIsShowReadMoreButton] = useState(-1);

  if (isLoading) return <NewsLoading />;

  const handleCardOnMouseOver = (index: number) =>
    setIsShowReadMoreButton(index);

  const handleCardOnMouseLeave = () => setIsShowReadMoreButton(-1);

  return (
    <>
      <HeadTags title="Reviews" />
      <Typography align="left" variant="h4" mt={5} mb={3} fontWeight="bold">
        Latest News
      </Typography>
      <Grid container spacing={3}>
        {news.articles.map((news: any, index: number) => (
          <Grid item sm={12} lg={6} key={index}>
            <Link
              href={news.url}
              target="_blank"
              rel="noopener"
              sx={{
                textDecoration: "none",
              }}
            >
              <Card
                sx={{ cursor: "pointer" }}
                onMouseEnter={() => handleCardOnMouseOver(index)}
                onMouseLeave={handleCardOnMouseLeave}
              >
                <CardMedia
                  component="img"
                  alt="News Img"
                  src={news.urlToImage || defaultCardImg.src}
                  height={200}
                />
                <CardContent sx={{ height: "200px" }}>
                  <Typography
                    lineHeight={1.2}
                    sx={{ fontSize: 22, fontWeight: "bold", mb: 1 }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontStyle="italic"
                    gutterBottom
                  >
                    {format(news.publishedAt, "d MMMM yyyy")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {news.description}
                  </Typography>
                </CardContent>

                <Slide direction="right" in={isShowReadMoreButton === index}>
                  <CardActions>
                    <Button
                      sx={{
                        pt: 5,
                        "&:hover": {
                          bgcolor: "transparent",
                          zIndex: 0,
                        },
                      }}
                      disableRipple
                      disableElevation
                      disableFocusRipple
                      size="small"
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Slide>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default News;
