import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const ReviewLoading = () => {
  return (
    <>
      <Typography align="left" variant="h4" my={4.5} fontWeight="bold">
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((num: any) => (
          <Grid item xs={12} md={6} lg={4} key={num}>
            <Card>
              <CardContent
                sx={{
                  maxHeight: 100,
                  minHeight: 300,
                  pb: 0,
                }}
              >
                <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 1 }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 1 }} />
              </CardContent>
              <Skeleton variant="text" sx={{ fontSize: "1rem", m: 1 }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReviewLoading;
