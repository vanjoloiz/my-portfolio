import type { NextPage } from 'next';
import NavBar from '@/components/NavBar';
import Landing from '@/components/Landing';
import Container from '@mui/material/Container';

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Container>
          <Landing />
        </Container>
      </main>
    </>
  );
};

export default Home;
