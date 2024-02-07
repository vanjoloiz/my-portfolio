import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";

const SendSuccess = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
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
        onClick={() => router.push("/v2/login")}
      >
        Back to login
      </Button>
    </Container>
  );
};

export default SendSuccess;
