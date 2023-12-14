import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const SendSuccess = () => {
  const router = useRouter();

  return (
    <div style={{ marginTop: "150px" }}>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Box p={5}>
            <Typography variant="h4" mb={2} align="center">
              Check your mail
            </Typography>

            <Typography variant="subtitle1" mb={2} align="center">
              We have sent a password recover instruction to{" "}
              <strong>{router.query.email}.</strong>
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

export default SendSuccess;
