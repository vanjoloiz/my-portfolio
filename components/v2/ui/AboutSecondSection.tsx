import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import SkillsCarousel from "./SkillsCarousel";
import { Container } from "@mui/material";
import Experiences from "./Experiences";

const AboutSecondSection = () => {
  return (
    <>
      <Slide direction="up" in={true} timeout={725} unmountOnExit mountOnEnter>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" align="left" mt={5} mb={3}>
            Coding with
          </Typography>
        </Container>
      </Slide>

      <SkillsCarousel />

      <Slide direction="up" in={true} timeout={725} unmountOnExit mountOnEnter>
        <Container maxWidth="md">
          <Experiences />
        </Container>
      </Slide>
    </>
  );
};

export default AboutSecondSection;
