import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const ResetSuccess = () => {
  const router = useRouter();

  return (
    <div style={{ marginTop: "150px" }}>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Box p={5}>
            <Typography variant="h4" mb={2} align="center">
              Password Changed!
            </Typography>

            <Typography variant="subtitle1" mb={2} align="center">
              Your password has been changed successfully.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              fullWidth
              disableElevation
              disableFocusRipple
              variant="contained"
              onClick={() => router.push("/login")}
            >
              Back to login
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetSuccess;
