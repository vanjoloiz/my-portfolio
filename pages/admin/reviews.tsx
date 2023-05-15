import { FC, Fragment, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Cookie from "js-cookie";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";
import { parseCookies } from "nookies";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import Backdrop from "@mui/material/Backdrop";
import { BASE_URL } from "@utils/baseUrl";

interface Review {
  _id: string;
  profile: {
    _id: string;
    firstName: string;
    lastName: string;
    linkedInProfileUrl: string;
    linkedInProfilePicUrl: string;
  };
  text: string;
  isApproved: boolean;
  updatedAt: string;
}

interface ReviewProps {
  reviews: Review[][];
}

const AdminReviews: FC<ReviewProps> = ({
  reviews: reviewsData,
}: ReviewProps) => {
  const [isApprovingLoading, setIsApprovingLoading] = useState(false);

  const token = Cookie.get("token");

  const PAGE_SIZE = 10;

  const getKey = (pageIndex: number, previousPageData: Review[]) => {
    if (previousPageData && !previousPageData.length) return null;

    if (previousPageData && previousPageData.length === PAGE_SIZE)
      return `/api/v1/review/admin?pageNumber=${pageIndex + 1}`;

    return "/api/v1/review/admin?pageNumber=1";
  };

  const {
    data: reviews,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<Review[]>(getKey, {
    revalidateFirstPage: false,
    revalidateOnMount: true,
    fallbackData: reviewsData,
  });

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

  const handleApprovedClick = async (reviewId: string) => {
    try {
      setIsApprovingLoading(true);
      await axios.put(
        `/api/v1/review/approved/${reviewId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      await mutate();

      setIsApprovingLoading(false);
    } catch (err) {
      setIsApprovingLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box pb={0} mt={10}>
          <InfiniteScroll
            scrollThreshold={0.5}
            style={{ overflow: "hidden" }}
            dataLength={paginateReviews.length}
            next={() => {
              setSize(size + 1);
            }}
            hasMore={!isReachingEnd}
            loader={
              <CircularProgress sx={{ display: "flex", margin: "auto" }} />
            }
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                paddingBottom: "25px",
              }}
            >
              {paginateReviews?.map((data) => (
                <Fragment key={data._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Link
                        href={data.profile.linkedInProfileUrl ?? undefined}
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
                        <>
                          <Link
                            href={data.profile.linkedInProfileUrl ?? undefined}
                            rel="noopener"
                            target="_blank"
                            sx={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "inherit",
                            }}
                          >
                            <Typography component="span" variant="subtitle2">
                              {data.profile.firstName} {data.profile.lastName}
                            </Typography>
                          </Link>
                          {data.isApproved && (
                            <Chip
                              sx={{ ml: 1 }}
                              label="Approved"
                              size="small"
                              color="success"
                            />
                          )}
                        </>
                      }
                      secondary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="subtitle1"
                          color="text.primary"
                        >
                          {`${data.text}`}
                        </Typography>
                      }
                    />
                    {!data.isApproved && (
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleApprovedClick(data._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))}
            </List>
          </InfiniteScroll>
        </Box>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isApprovingLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AdminReviews;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { token } = parseCookies(context);

  const { data } = await axios.get<Review[]>(
    `${BASE_URL}/api/v1/review/admin?pageNumber=1`,
    {
      headers: { Authorization: token },
    }
  );

  return {
    props: {
      reviews: data,
    },
  };
};
