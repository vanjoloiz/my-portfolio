import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Reviews = () => {
  const router = useRouter();

  return (
    <Box pb={25}>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          paddingBottom: '25px',
        }}
      >
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Brunch this weekend?'
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Summer BBQ'
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Oui Oui'
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </>
            }
          />
        </ListItem>
      </List>

      <Button
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
    </Box>
  );
};

export default Reviews;
