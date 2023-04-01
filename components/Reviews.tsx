import { useRef, FC, Fragment } from 'react';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import useAnimate from '@/lib/useAnimate';

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

const Reviews: FC<ReviewProps> = ({ reviewsInitialValue }) => {
  const router = useRouter();

  const PAGE_SIZE = 5;

  const animRef = useRef(null);

  const animate = useAnimate(animRef);

  const getKey = (pageIndex: number, previousPageData: Review[]) => {
    if (previousPageData && !previousPageData.length) return null;

    if (previousPageData && previousPageData.length === PAGE_SIZE)
      return `/api/v1/review?pageNumber=${pageIndex + 1}`;

    return '/api/v1/review?pageNumber=1';
  };

  const {
    data: reviews,
    error,
    size,
    setSize,
  } = useSWRInfinite<Review[]>(getKey, {
    revalidateFirstPage: false,
    revalidateOnMount: true,
    fallbackData: reviewsInitialValue,
  });

  const isLoadingInitialData = !reviews && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (reviews && typeof reviews[size - 1] === 'undefined');

  const isEmpty = reviews?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (reviews && reviews[reviews.length - 1]?.length < PAGE_SIZE);

  const paginateReviews = reviews ? reviews.flat() : [];

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0);
    const lastWords = lastName.split(' ');

    const lastInitial = lastWords[lastWords.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`;
  };

  const isShowViewMoreButton = paginateReviews.length >= PAGE_SIZE;

  return (
    <>
      <Typography component='span' variant='h3'>
        Reviews
      </Typography>
      <Box pb={25} mt={1} ref={animRef}>
        <Fade in={animate} style={{ transitionDelay: '100ms' }}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              paddingBottom: '25px',
            }}
          >
            {paginateReviews?.map((data) => (
              <Fragment key={data._id}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar>
                      {getInitials(
                        data.profile.firstName,
                        data.profile.lastName
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component='span' variant='subtitle2'>
                        {data.profile.firstName} {data.profile.lastName}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='subtitle1'
                          color='text.primary'
                        >
                          {`${data.text}`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </Fragment>
            ))}
          </List>
        </Fade>

        <Fade in={animate} style={{ transitionDelay: '100ms' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ ml: 1 }}
              color='secondary'
              variant='contained'
              disableElevation
              disableFocusRipple
              onClick={() => {
                router.push('/create-review');
              }}
            >
              Add review
            </Button>

            {isShowViewMoreButton && (
              <Button
                disabled={isReachingEnd || isLoadingMore}
                color='secondary'
                variant='contained'
                disableElevation
                disableFocusRipple
                onClick={() => {
                  setSize(size + 1);
                }}
              >
                {isLoadingMore ? 'loading...' : 'view more'}
              </Button>
            )}
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default Reviews;
