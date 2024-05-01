import Image from "next/image";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import HeadTags from "./HeadTags";
import InfoList from "./ui/InfoList";
import srcImage from "../../public/mern-stack.jpg";

const About = () => {
  return (
    <>
      <HeadTags title="About" />
      <Box sx={{ pt: 10 }}>
        <Typography align="left" variant="h4" fontWeight="bold" mb={5}>
          About me
        </Typography>
        <Image
          src={srcImage}
          alt="MERN Image"
          placeholder="blur"
          blurDataURL="./mern-stack.jpg"
          priority
        />
        <Typography variant="h5" fontWeight="bold" mt={3}>
          Salvador Santos Loiz Jr.
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" mt={1} mb={2}>
          Web Developer
        </Typography>

        <Divider />

        <Typography variant="subtitle1" color="text.secondary" mt={2}>
          I am a well-qualified Full Stack JavaScript Developer with a rich
          background encompassing four years of experience. My expertise extends
          seamlessly across both backend and frontend development, allowing me
          to adeptly navigate every stage of the development process. As a
          collaborative team player, I bring exceptional technical abilities to
          the table, ensuring effective and efficient contribution to project
          success.
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" my={2}>
          My passion for web development is evident in my knack for creating
          dynamic and user-friendly web applications. Over the course of my
          journey in this field, I have cultivated a robust foundation in both
          front-end and back-end technologies. This skill set positions me as a
          versatile and skilled developer, capable of delivering innovative
          solutions and contributing meaningfully to any development team.
        </Typography>

        <Divider />

        <InfoList />

        <Divider sx={{ mt: 3, mb: 10 }} />

        <Link
          href="/salvador-santos-loiz-jr.-updated.pdf"
          download="salvador-santos-loiz-jr.-updated.pdf"
          sx={{
            mt: 10,
            backgroundColor: "primary.main",
            textDecoration: "none",
            p: 2.5,
            color: "secondary.main",
          }}
        >
          Download CV
        </Link>
      </Box>
    </>
  );
};

export default About;
