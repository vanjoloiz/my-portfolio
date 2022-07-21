import React from 'react';
import Typed from 'react-typed';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import LinkedInLogo from '@/assets/linkedin.svg';
import FacebookLogo from '@/assets/facebook.svg';
import GithubLogo from '@/assets/github.svg';
import Link from '@mui/material/Link';

const Landing = () => {
  return (
    <Box mt={25}>
      <Grid container>
        <Grid item md={6}>
          <Typography variant='h1' component='div' gutterBottom>
            Hi, I&apos;m Salvador
          </Typography>
          <Typed
            style={{ fontSize: '32px' }}
            strings={[
              'Full-stack developer 🌐',
              'Love JavaScript Development. 🚀',
              'React Developer. ⚛️',
              'Node.js Developer. 💻',
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            <Link
              href='https://www.linkedin.com/in/salvador-loiz-jr-4b85341a6/'
              target='_blank'
              rel='noopener'
            >
              <LinkedInLogo style={{ width: '50px', height: '50px' }} />
            </Link>
            <Link
              href='https://www.facebook.com/xD.raze01/'
              target='_blank'
              rel='noopener'
            >
              <FacebookLogo style={{ width: '50px', height: '50px' }} />
            </Link>

            <Link
              href='https://github.com/MarshallLoiz'
              target='_blank'
              rel='noopener'
            >
              <GithubLogo style={{ width: '50px', height: '50px' }} />
            </Link>
          </div>
        </Grid>
        <Grid item md={6}>
          <Image
            src='/dev-image.png'
            layout='fixed'
            width={450}
            height={350}
            alt='Image'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
