import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Cookie from "js-cookie";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import { Form, Formik, Field } from "formik";
import { loginValidationSchema } from "@utils/formValidationSchema";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState({ isShow: false, message: "" });

  const [isLoading, setIsLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const isRedirectToQuery = router.query.redirect !== undefined;

  const redirect = isRedirectToQuery ? String(router.query.redirect) : "/";

  const signUpAnchorRedirect = isRedirectToQuery
    ? `/signup?redirect=${String(router.query.redirect)}`
    : "/signup";

  const handleShowPasswordClick = () => setIsShowPassword(!isShowPassword);

  const handleSubmit = async (values: FormValues, { setFieldValue }: any) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/v1/auth", values);

      setError({ isShow: false, message: "" });

      Cookie.set("token", data);

      router.push(redirect);
      router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
      });
    } catch (err: any) {
      setFieldValue("password", "", false);

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
                Login
              </Typography>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={loginValidationSchema}
              >
                {({ touched, errors, handleChange, values }) => (
                  <Form>
                    <Field
                      component={TextField}
                      label="Username"
                      fullWidth
                      margin="dense"
                      id="username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      onChange={handleChange}
                      value={values.username || ""}
                    />

                    <Field
                      component={TextField}
                      label="Password"
                      fullWidth
                      type={isShowPassword ? "text" : "password"}
                      margin="dense"
                      id="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      value={values.password || ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleShowPasswordClick}
                              edge="end"
                            >
                              {isShowPassword ? (
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
                      variant="contained"
                      disableElevation
                      disableFocusRipple
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <CircularProgress
                          sx={{ position: "absolute", right: "50px" }}
                          size={17}
                        />
                      )}
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <Link href={signUpAnchorRedirect} color="inherit">
                Don&apos; t have an account? Sign Up
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
