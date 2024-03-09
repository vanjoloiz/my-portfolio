import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const experienceSteps = [
  {
    label: "PeakROI",
    description: "Full Stack Web Developer",
    date: "Jan 2024 - Present",
  },
  {
    label: "StackPH",
    description: "Node.js/Nest.js Developer",
    date: "Nov 2022 - Jan 2024",
  },
  {
    label: "Ubidy",
    description: `React Developer`,
    date: "Jan 2020 - Jan 2024",
  },
];

const educationSteps = [
  {
    label: "STI College Balagtas",
    description: "Computer Engineering",
    date: "Jun 2014 - Oct 2019",
  },
  {
    label: "Balagtas National Agricultural High School",
    date: "Jun 2010 - Apr 2014",
  },
  {
    label: "Borol 1st Elementary School",
    date: "Jan 2004 - Mar 2010",
  },
];

const Experiences = () => {
  return (
    <Box
      sx={{
        mb: 10,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" fontWeight="bold" align="left" mt={5} mb={3}>
            Experience
          </Typography>
          <Stepper orientation="vertical">
            {experienceSteps.map((step) => (
              <Step key={step.label} active>
                <StepLabel icon={<FiberManualRecordIcon />}>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {step.date}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid item>
          <Typography variant="h5" fontWeight="bold" align="left" mt={5} mb={3}>
            Education
          </Typography>
          <Stepper orientation="vertical">
            {educationSteps.map((step) => (
              <Step key={step.label} active>
                <StepLabel icon={<FiberManualRecordIcon />}>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {step.date}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Experiences;
