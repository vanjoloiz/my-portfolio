import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
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
  const [reviewModalData, setReviewModalData] = useState({
    title: "",
    text: "",
    date: "",
    authorFirstName: "",
    authorLastName: "",
  });

  const [isShowReadMoreButton, setIsShowReadMoreButton] = useState(-1);

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, {
    revalidateFirstPage: false,
    fallbackData: reviews,
  });

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  if (isLoading) return <ReviewLoading />;

  const paginateReviews = data ? data.flat() : [];

  const isReachEnd = data![data!.length - 1]?.length < 6;

  const handleReviewMoreClick = (review: any) => {
    setIsOpenModal(!isOpenModal);

    setReviewModalData((prev) => ({
      ...prev,
      title: review.title,
      text: review.text,
      createdAt: review.createdAt,
      authorFirstName: review.profile.firstName,
      authorLastName: review.profile.lastName || "",
    }));
  };

  const handleModalOnClose = () => setIsOpenModal(false);

  const handleCardOnMouseOver = (index: number) =>
    setIsShowReadMoreButton(index);

  const handleCardOnMouseLeave = () => setIsShowReadMoreButton(-1);

  return (
    <>
      <MetaTags title="Reviews" />
      <Typography align="left" variant="h4" mt={5} mb={3} fontWeight="bold">
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {paginateReviews.map((review: any, index: number) => (
          <Grid item xs={12} md={6} lg={4} key={review._id}>
            <Card
              sx={{
                cursor: "pointer",
              }}
              onClick={() => handleReviewMoreClick(review)}
              onMouseEnter={() => handleCardOnMouseOver(index)}
              onMouseLeave={handleCardOnMouseLeave}
            >
              <CardContent
                sx={{
                  maxHeight: 100,
                  minHeight: 300,
                  pb: 0,
                }}
              >
                <Typography
                  sx={{ fontSize: 22, fontWeight: "bold" }}
                  color="text.main"
                  gutterBottom
                >
                  {review.profile.firstName} {review.profile.lastName}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 12,
                    WebkitBoxOrient: "vertical",
                    fontStyle: "italic",
                  }}
                  variant="body2"
                >
                  &quot;{review.text}&quot;
                </Typography>
              </CardContent>

              <Slide direction="right" in={isShowReadMoreButton === index}>
                <CardActions>
                  <Button
                    sx={{
                      pb: 1,
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
          </Grid>
        ))}
      </Grid>
      {!isReachEnd && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
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

      <ReviewModal
        review={reviewModalData}
        isOpen={isOpenModal}
        onClose={handleModalOnClose}
      />
    </>
  );
};

export default Reviews;
