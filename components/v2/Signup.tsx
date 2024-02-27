import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Cookie from "js-cookie";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { signUpValidationSchema } from "@utils/formValidationSchema";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LanguageIcon from "@mui/icons-material/Language";
import InputAdornment from "@mui/material/InputAdornment";
import { BASE_URL } from "@utils/baseUrl";
import MetaTags from "./MetaTags";

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

let cancel: any;

const SignUp = () => {
  const router = useRouter();

  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [username, setUsername] = useState({
    isError: false,
    isLoading: false,
    errorMessage: "",
  });

  const isRedirectToQuery = router.query.redirect !== undefined;

  const redirect = "/v2/welcome";

  const loginAnchorRedirect = isRedirectToQuery
    ? `/v2/login?redirect=${String(router.query.redirect)}`
    : "/v2/login";

  const handleIsUsernameTakenChange = async (username: string) => {
    try {
      if (username.trim() !== "") {
        if (cancel) {
          cancel();
        }

        const { CancelToken } = axios;

        setUsername((prev) => ({
          ...prev,
          isLoading: true,
          isError: false,
        }));

        await axios.get(`${BASE_URL}/api/v1/auth/authusername/${username}`, {
          cancelToken: new CancelToken((canceler) => {
            cancel = canceler;
          }),
        });

        setUsername((prev) => ({
          ...prev,
          isError: false,
          errorMessage: "",
          isLoading: false,
        }));
      } else {
        setUsername((prev) => ({
          ...prev,
          isError: false,
          errorMessage: "",
        }));
      }
    } catch (err: any) {
      if (err.code !== "ERR_CANCELED") {
        setUsername((prev) => ({
          ...prev,
          isError: true,
          errorMessage: err.response?.data,
          isLoading: false,
        }));
      }
    }
  };

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

      Cookie.set("token", data, { expires: 7, secure: true });

      router.push(redirect);
      router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
      });
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  const getUsernameInputAdornment = (
    usernameError: boolean,
    usernameValue: string
  ) => {
    if (username.isLoading) {
      return (
        <InputAdornment position="end">
          <CircularProgress size={17} />
        </InputAdornment>
      );
    }

    if (username.isError && !username.isLoading) {
      return (
        <InputAdornment position="end">
          <CloseIcon sx={{ fill: "red" }} />{" "}
        </InputAdornment>
      );
    }

    if (
      !username.isError &&
      !username.isLoading &&
      usernameError &&
      usernameValue !== ""
    ) {
      return (
        <InputAdornment position="end">
          <CheckIcon sx={{ fill: "green" }} />
        </InputAdornment>
      );
    }
  };

  return (
    <>
      <MetaTags title="Sign Up" />
      <Container maxWidth="md">
        <Box sx={{ display: "block", margin: "auto" }}>
          <Typography align="left" variant="h4" my={2} fontWeight="bold">
            Sign up
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              password: "",
              confirmPassword: "",
              profileUrl: "",
              email: "",
              phoneNumber: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={signUpValidationSchema}
          >
            {({ touched, errors, handleChange, values }) => (
              <Form>
                <Grid container>
                  <Grid container item spacing={isSmall ? 0 : 2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        component={TextField}
                        label="First name"
                        margin="dense"
                        id="firstName"
                        sx={{ mr: 1 }}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        component={TextField}
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
                    label="Username"
                    margin="dense"
                    id="username"
                    fullWidth
                    onChange={(event: any) => {
                      handleChange(event);
                      handleIsUsernameTakenChange(event.target.value);
                    }}
                    error={
                      (touched.username && Boolean(errors.username)) ||
                      (username.isError && !username.isLoading)
                    }
                    helperText={
                      (touched.username && errors.username) ||
                      username.errorMessage
                    }
                    InputProps={{
                      endAdornment: getUsernameInputAdornment(
                        Boolean(!errors.username),
                        values.username
                      ),
                    }}
                  />

                  <Field
                    component={TextField}
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
                    label="Confirm password"
                    margin="dense"
                    id="confirmPassword"
                    type={isShowPassword.confirmPassword ? "text" : "password"}
                    fullWidth
                    onChange={handleChange}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
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

                  <Field
                    component={TextField}
                    label="Email"
                    placeholder="Email"
                    margin="dense"
                    id="email"
                    onChange={handleChange}
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Field
                    component={TextField}
                    label="Phone number (optional)"
                    placeholder="Phone number"
                    margin="dense"
                    id="phoneNumber"
                    onChange={handleChange}
                    fullWidth
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+63</InputAdornment>
                      ),
                    }}
                  />

                  <Field
                    component={TextField}
                    label="Profile URL (optional)"
                    placeholder="Preferably LinkedIn"
                    margin="dense"
                    id="profileUrl"
                    onChange={handleChange}
                    fullWidth
                    error={touched.profileUrl && Boolean(errors.profileUrl)}
                    helperText={touched.profileUrl && errors.profileUrl}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
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
          <Link
            href={loginAnchorRedirect}
            legacyBehavior={false}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ color: "primary.main" }}>
              Already have an account? Sign in
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
