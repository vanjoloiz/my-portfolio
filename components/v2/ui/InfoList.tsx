import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const firstColumnItems = [
  {
    info: "Birthday",
    answer: "01.06.1998",
  },

  {
    info: "Age",
    answer: "26",
  },

  {
    info: "Address",
    answer: "A127 Borol 1st, Balagtas, Bulacan, PH",
  },

  {
    info: "Email",
    answer: "vanjoloiz01@gmail.com",
  },

  {
    info: "Phone",
    answer: "+639999705220",
  },
];

const secondColumnItems = [
  {
    info: "Nationality",
    answer: "Filipino",
  },

  {
    info: "Study",
    answer: "STI College Balagtas",
  },

  {
    info: "Degree",
    answer: "Bachelor's",
  },

  {
    info: "Interest",
    answer: "Gaming, Anime",
  },

  {
    info: "Freelance",
    answer: "Available",
  },
];

const InfoList = () => {
  return (
    <Grid container justifyContent="center" spacing={{ md: 12 }}>
      <Grid item sm={12} md={6}>
        {firstColumnItems.map((item) => (
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mt={2}
            key={item.info}
          >
            {item.info}:{" "}
            <span
              style={{
                color: "text.secondary",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              {item.answer}
            </span>
          </Typography>
        ))}
      </Grid>

      <Grid item sm={12} md={6}>
        {secondColumnItems.map((item) => (
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mt={2}
            key={item.info}
          >
            {item.info}:{" "}
            <span
              style={{
                color: "text.secondary",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              {item.answer}
            </span>
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default InfoList;
