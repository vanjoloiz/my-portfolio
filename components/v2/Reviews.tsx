import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewLoading from "./ReviewLoading";
import MetaTags from "./MetaTags";
import ReviewModal from "./ReviewModal";

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;

  return `/api/v1/review?pageNumber=${pageIndex + 1}`;
};

const Reviews = ({ reviews }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, {
    revalidateFirstPage: false,
    fallbackData: reviews,
  });

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  if (isLoading) return <ReviewLoading />;

  const paginateReviews = data ? data.flat() : [];

  const isReachEnd = data![data!.length - 1]?.length < 6;

  const handleReviewMoreClick = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <MetaTags title="Reviews" />
      <Typography align="left" variant="h4" my={4.5} fontWeight="bold">
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {paginateReviews.map((review: any) => (
          <Grid item xs={12} md={6} lg={4} key={review._id}>
            <Card>
              <CardContent
                sx={{
                  maxHeight: 100,
                  minHeight: 300,
                  pb: 0,
                }}
              >
                <Typography
                  sx={{ fontSize: 22, fontWeight: "bold", color: "#E9E9E9" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {review.profile.firstName} {review.profile.lastName}
                </Typography>
                <Typography
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 12,
                    WebkitBoxOrient: "vertical",
                    color: "#BBBBBB",
                    fontStyle: "italic",
                  }}
                  variant="body2"
                >
                  &quot;{review.text}&quot;
                </Typography>
              </CardContent>
              <CardActions sx={{ pt: 2 }}>
                <Button
                  onClick={handleReviewMoreClick}
                  sx={{
                    "&:hover": {
                      bgcolor: "transparent",
                      letterSpacing: "2px",
                      transition: ".3s ease-in-out",
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
            </Card>
          </Grid>
        ))}
      </Grid>
      {!isReachEnd && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 1.5 }}>
          <Button
            disableElevation
            disableFocusRipple
            disableRipple
            variant="contained"
            onClick={() => setSize(size + 1)}
          >
            Load more
            {isLoadingMore && (
              <CircularProgress size={10} color="inherit" sx={{ ml: 1 }} />
            )}
          </Button>
        </Box>
      )}

      <ReviewModal isOpen={isOpenModal} onClose={handleReviewMoreClick} />
    </>
  );
};

export default Reviews;
