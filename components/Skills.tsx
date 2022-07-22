import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JavascriptLogo from '@/assets/javascript.svg';
import TypeScriptLogo from '@/assets/typescript.svg';
import Html5Logo from '@/assets/html5.svg';
import Css3Logo from '@/assets/css3.svg';
import ReactLogo from '@/assets/react.svg';
import NextjsLogo from '@/assets/nextjs.svg';
import ApolloLogo from '@/assets/apollo.svg';
import ReduxLogo from '@/assets/redux.svg';
import MUILogo from '@/assets/mui.svg';
import BootstrapLogo from '@/assets/bootstrap.svg';
import AntdLogo from '@/assets/antd.svg';
import NodeJsLogo from '@/assets/nodejs.svg';
import ExpressLogo from '@/assets/express.svg';
import MongodbLogo from '@/assets/mongodb.svg';
import PostGresLogo from '@/assets/postgres.svg';
import HerokuLogo from '@/assets/heroku.svg';
import GraphQLLogo from '@/assets/graphql.svg';
import RestLogo from '@/assets/rest.svg';
import NestJSLogo from '@/assets/nestjs.svg';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';

const Skills: React.FC = () => {
  return (
    <Box pb={30}>
      <Grid container>
        <Grid item sm={12} md={6}>
          <Image
            layout='fixed'
            src='/dev2-image.png'
            width={500}
            height={500}
            alt='Image'
            priority
          />
        </Grid>
        <Grid container item md={6} direction='column'>
          <Box>
            <Typography paragraph align='right' sx={{ fontSize: '42px' }}>
              Languages known
            </Typography>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Tooltip title='Javascript'>
                <JavascriptLogo />
              </Tooltip>

              <Tooltip title='Typescript'>
                <TypeScriptLogo />
              </Tooltip>

              <Tooltip title='HTML'>
                <Html5Logo />
              </Tooltip>

              <Tooltip title='CSS'>
                <Css3Logo />
              </Tooltip>
            </Box>
          </Box>

          <Box mt={5}>
            <Typography paragraph align='right' sx={{ fontSize: '42px' }}>
              Frontend
            </Typography>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Tooltip title='React'>
                <ReactLogo />
              </Tooltip>

              <Tooltip title='Next.js'>
                <NextjsLogo />
              </Tooltip>

              <Tooltip title='Apollo Client'>
                <ApolloLogo />
              </Tooltip>

              <Tooltip title='Redux'>
                <ReduxLogo />
              </Tooltip>

              <Tooltip title='Material UI'>
                <MUILogo />
              </Tooltip>

              <Tooltip title='Bootstrap'>
                <BootstrapLogo />
              </Tooltip>

              <Tooltip title='Ant Design'>
                <AntdLogo />
              </Tooltip>
            </Box>
          </Box>

          <Box mt={5}>
            <Typography paragraph align='right' sx={{ fontSize: '42px' }}>
              Backend, Database and Cloud
            </Typography>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Tooltip title='Node.js'>
                <NodeJsLogo />
              </Tooltip>

              <Tooltip title='Express.js'>
                <ExpressLogo />
              </Tooltip>

              <Tooltip title='Nest.js'>
                <NestJSLogo />
              </Tooltip>

              <Tooltip title='MongoDB'>
                <MongodbLogo />
              </Tooltip>

              <Tooltip title='Postgres'>
                <PostGresLogo />
              </Tooltip>

              <Tooltip title='REST API'>
                <RestLogo />
              </Tooltip>

              <Tooltip title='GraphQL API'>
                <GraphQLLogo />
              </Tooltip>

              <Tooltip title='Heroku'>
                <HerokuLogo />
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Skills;
