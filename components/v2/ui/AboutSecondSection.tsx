import Typography from "@mui/material/Typography";
import SkillsCarousel from "./SkillsCarousel";
import { Container } from "@mui/material";
import Experiences from "./Experiences";

const AboutSecondSection = () => {
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h5" fontWeight="bold" align="left" mt={5} mb={3}>
          Coding with
        </Typography>
      </Container>

      <SkillsCarousel />

      <Container maxWidth="md">
        <Experiences />
      </Container>
    </>
  );
};

export default AboutSecondSection;
