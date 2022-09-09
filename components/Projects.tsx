import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Image from 'next/image';
import Hidden from '@mui/material/Hidden';
import Fade from '@mui/material/Fade';
import useAnimate from '@/lib/useAnimate';

const Projects = () => {
  const animRef = React.useRef(null);
  const animate = useAnimate(animRef);

  return (
    <Box pb={30}>
      <Hidden lgUp>
        <Typography align='center' variant='h1' gutterBottom>
          Projects
        </Typography>
      </Hidden>

      <Grid container spacing={2}>
        <Grid container item md={12} lg={6} spacing={2} ref={animRef}>
          <Grid item xs={12} lg={6}>
            <Fade in={animate} style={{ transitionDelay: `${200 * 0}ms` }}>
              <Link
                href='https://ipostitph.herokuapp.com'
                target='_blank'
                sx={{ textDecoration: 'none' }}
              >
                <CardActionArea>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant='h5' gutterBottom mb={5}>
                        iPostItPH
                      </Typography>

                      <Typography variant='body2' color='text.secondary' mb={5}>
                        Social media platform for filipino users.
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item md={4}>
                          <Chip label='NextJS' />
                        </Grid>

                        <Grid item md={4}>
                          <Chip label='NodeJS' />
                        </Grid>

                        <Grid item md={5}>
                          <Chip label='MongoDB' />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            </Fade>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Fade in={animate} style={{ transitionDelay: `${200 * 1}ms` }}>
              <Link
                href='https://loizapp.herokuapp.com'
                target='_blank'
                sx={{ textDecoration: 'none' }}
              >
                <CardActionArea>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant='h5' gutterBottom mb={5}>
                        LApp
                      </Typography>

                      <Typography variant='body2' color='text.secondary' mb={5}>
                        Blogging Post platform for filipino users.
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item md={4}>
                          <Chip label='Express' />
                        </Grid>

                        <Grid item md={4}>
                          <Chip label='NodeJS' />
                        </Grid>

                        <Grid item md={5}>
                          <Chip label='MongoDB' />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            </Fade>
          </Grid>
        </Grid>

        <Grid container item md={6}>
          <Hidden lgDown>
            <Grid item md={12}>
              <Typography align='center' paragraph sx={{ fontSize: '58px' }}>
                Projects
              </Typography>
              <Fade in={animate} style={{ transitionDelay: '100ms' }}>
                <div>
                  <Image
                    layout='fixed'
                    src='/dev3-image.png'
                    width={800}
                    height={500}
                    alt='Image'
                    priority
                  />
                </div>
              </Fade>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;
