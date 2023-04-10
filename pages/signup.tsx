import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { signupValidationSchema } from "@utils/formValidationSchema";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();

  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [error, setError] = useState({ isShow: false, message: "" });

  const [isLoading, setIsLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const isRedirectToQuery = router.query.redirect !== undefined;

  const redirect = isRedirectToQuery ? String(router.query.redirect) : "/";

  const loginAnchorRedirect = isRedirectToQuery
    ? `/login?redirect=${String(router.query.redirect)}`
    : "/login";

  const handleShowPasswordClick = () => {
    setIsShowPassword({
      ...isShowPassword,
      password: !isShowPassword.password,
    });
  };

  const handleShowConfirmPasswordClick = () => {
    setIsShowPassword({
      ...isShowPassword,
      confirmPassword: !isShowPassword.confirmPassword,
    });
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/v1/auth/signup ", values);

      setError({ isShow: false, message: "" });

      Cookie.set("token", data);

      router.push(redirect);
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
    <div style={{ marginTop: "150px" }}>
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
                    <Grid container>
                      <Grid container item spacing={isSmall ? 0 : 2}>
                        <Grid item xs={12} md={6}>
                          <Field
                            component={TextField}
                            color="secondary"
                            label="First name"
                            margin="dense"
                            id="firstName"
                            sx={{ mr: 1 }}
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Field
                            component={TextField}
                            color="secondary"
                            label="Last name"
                            id="lastName"
                            margin="dense"
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            fullWidth
                          />
                        </Grid>
                      </Grid>

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
                        type={isShowPassword.password ? "text" : "password"}
                        id="password"
                        fullWidth
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleShowPasswordClick}
                                edge="end"
                              >
                                {isShowPassword.password ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Field
                        component={TextField}
                        color="secondary"
                        label="Confirm password"
                        margin="dense"
                        id="confirmPassword"
                        type={
                          isShowPassword.confirmPassword ? "text" : "password"
                        }
                        fullWidth
                        onChange={handleChange}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleShowConfirmPasswordClick}
                                edge="end"
                              >
                                {isShowPassword.confirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
                    </Grid>
                  </Form>
                )}
              </Formik>
              <Link href={loginAnchorRedirect} color="inherit">
                Already have an account? Sign in
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
