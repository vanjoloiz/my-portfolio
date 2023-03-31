import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { signupValidationSchema } from "@utils/formValidationSchema";

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = ({ user }: any) => {
  const router = useRouter();

  const [error, setError] = useState({ isShow: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/v1/auth/signup ", values);

      setError({ isShow: false, message: "" });

      Cookie.set("token", data);

      router.push("/");
      router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
      });
    } catch (err: any) {
      setError({
        isShow: true,
        message: err.response.data,
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main style={{ marginTop: "150px" }}>
        <Container maxWidth="sm">
          <Box sx={{ display: "block", margin: "auto" }}>
            <Paper elevation={3}>
              <Box p={6}>
                {error.isShow && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error.message}
                  </Alert>
                )}
                <Typography variant="h4" mb={2}>
                  Sign up
                </Typography>

                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={signupValidationSchema}
                >
                  {({ touched, errors, handleChange }) => (
                    <Form>
                      <Box
                        sx={{
                          "& .MuiTextField-root": { width: "48%" },
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <Field
                          component={TextField}
                          color="secondary"
                          label="First name"
                          margin="dense"
                          id="firstName"
                          sx={{ mr: 1 }}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                          onChange={handleChange}
                        />

                        <Field
                          component={TextField}
                          color="secondary"
                          label="Last name"
                          id="lastName"
                          margin="dense"
                          onChange={handleChange}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Box>

                      <Field
                        component={TextField}
                        color="secondary"
                        label="Username"
                        margin="dense"
                        id="username"
                        fullWidth
                        onChange={handleChange}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />

                      <Field
                        component={TextField}
                        color="secondary"
                        label="Password"
                        margin="dense"
                        type="password"
                        id="password"
                        fullWidth
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <Field
                        component={TextField}
                        color="secondary"
                        label="Confirm password"
                        margin="dense"
                        id="confirmPassword"
                        type="password"
                        fullWidth
                        onChange={handleChange}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />

                      <Button
                        sx={{ mt: 2, mb: 2 }}
                        fullWidth
                        color="secondary"
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                        disabled={isLoading}
                        type="submit"
                      >
                        Sign up
                        {isLoading && (
                          <CircularProgress
                            sx={{ position: "absolute", right: "50px" }}
                            size={17}
                          />
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
                <Link href="/login" color="inherit">
                  Already have an account? Sign in
                </Link>
              </Box>
            </Paper>
            <div style={{ marginTop: "10px" }}>
              <Footer />
            </div>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default SignUp;
