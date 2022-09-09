import type { NextPage } from 'next';
import NavBar from '@/components/NavBar';
import Landing from '@/components/Landing';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import Container from '@mui/material/Container';

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Landing />
        <Skills />
        <Projects />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
