import { useRef, FC, Fragment } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import useSWRInfinite from "swr/infinite";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useAnimate from "@/lib/useAnimate";
import SeeMoreSeeLess from "./SeeMoreSeeLess";
import { Review } from "@interfaces/Review";
import { User } from "@interfaces/User";

interface ReviewProps {
  reviewsInitialValue: Review[][];
  loggedInUser: User;
}

const Reviews: FC<ReviewProps> = ({ reviewsInitialValue, loggedInUser }) => {
  const router = useRouter();

  const PAGE_SIZE = 5;

  const animRef = useRef(null);

  const animate = useAnimate(animRef);

  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.only("xs"));

  const getKey = (pageIndex: number, previousPageData: Review[]) => {
    if (previousPageData && !previousPageData.length) return null;

    if (previousPageData && previousPageData.length === PAGE_SIZE)
      return `/api/v1/review?pageNumber=${pageIndex + 1}`;

    return "/api/v1/review?pageNumber=1";
  };

  const {
    data: reviews,
    error,
    size,
    setSize,
  } = useSWRInfinite<Review[]>(getKey, {
    revalidateOnMount: true,
    fallbackData: reviewsInitialValue,
  });

  const isLoadingInitialData = !reviews && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (reviews && typeof reviews[size - 1] === "undefined");

  const isEmpty = reviews?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (reviews && reviews[reviews.length - 1]?.length < PAGE_SIZE);

  const paginateReviews = reviews ? reviews.flat() : [];

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0);

    const lastWords = lastName.split(" ");

    const lastInitial = lastWords[lastWords.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`;
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant={isMediumScreenSize ? "h2" : "h3"}
        fontWeight={isMediumScreenSize ? "bold" : "normal"}
      >
        Reviews
      </Typography>
      <Box pb={15} mt={1} ref={animRef}>
        <Fade in={animate} style={{ transitionDelay: "100ms" }}>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              paddingBottom: "25px",
            }}
          >
            {paginateReviews?.map((data) => {
              const isShowEditButton = data.profile._id === loggedInUser?._id;

              return (
                <Fragment key={data._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Link
                        href={
                          data.profile.linkedInProfileUrl === ""
                            ? undefined
                            : data.profile.linkedInProfileUrl
                        }
                        rel="noopener"
                        target="_blank"
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          src={data.profile.linkedInProfilePicUrl ?? undefined}
                        >
                          {data.profile.linkedInProfilePicUrl ?? (
                            <Typography>
                              {getInitials(
                                data.profile.firstName,
                                data.profile.lastName
                              )}
                            </Typography>
                          )}
                        </Avatar>
                      </Link>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          href={
                            data.profile.linkedInProfileUrl === ""
                              ? undefined
                              : data.profile.linkedInProfileUrl
                          }
                          rel="noopener"
                          target="_blank"
                          sx={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography component="span" variant="subtitle2">
                            {data.profile.firstName} {data.profile.lastName}
                          </Typography>
                          {isShowEditButton && (
                            <>
                              <IconButton
                                disableFocusRipple
                                onClick={() =>
                                  router.push(`/edit-review/${data._id}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </>
                          )}
                        </Link>
                      }
                      secondary={
                        <SeeMoreSeeLess text={data.text} maxLength={300} />
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              );
            })}
          </List>
        </Fade>

        <Fade in={animate} style={{ transitionDelay: "100ms" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              disableElevation
              disableFocusRipple
              onClick={() => {
                router.push("/create-review");
              }}
            >
              Add review
            </Button>

            {!isReachingEnd && (
              <Button
                disabled={isReachingEnd || isLoadingMore}
                variant="contained"
                disableElevation
                disableFocusRipple
                onClick={() => {
                  setSize(size + 1);
                }}
              >
                {isLoadingMore ? "loading..." : "view more"}
              </Button>
            )}
          </Box>
        </Fade>
      </Box>
    </Container>
  );
};

export default Reviews;
