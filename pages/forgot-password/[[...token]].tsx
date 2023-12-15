import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  createNewPasswordValidationSchema,
  resetPasswordValidationSchema,
} from "@utils/formValidationSchema";
import { BASE_URL } from "@utils/baseUrl";

const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

const showErrorAlert = (message: string) => {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

const ForgotPassword = () => {
  const router = useRouter();

  const isNoParams = isEmpty(router.query);

  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [isError, setIsError] = useState({
    usernameNotFound: false,
    invalidToken: false,
    isExpired: false,
    samePassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPasswordSubmit = async (values: { username: string }) => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/auth/forgot-password`,
        {
          username: values.username,
        }
      );

      router.push(`/forgot-password/send-success?email=${data.userEmail}`);
      router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
      });
    } catch (err) {
      setIsError((prev) => ({
        ...prev,
        usernameNotFound: true,
        invalidToken: false,
      }));
      setIsLoading(false);
    }
  };

  const handleCreateNewPasswordSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/forgot-password/${String(
          router?.query?.token
        )}`,
        { password: values.password, confirmPassword: values.confirmPassword }
      );

      router.push(`/forgot-password/reset-success`);
      router.events.on("routeChangeComplete", () => {
        setIsLoading(false);
      });
    } catch (err: any) {
      if (err.response.data === "Please don't use your old password.") {
        return setIsError((prev) => ({
          ...prev,
          usernameNotFound: false,
          invalidToken: false,
          samePassword: true,
        }));
      }

      if (err.response.data === "Token is expired, please request again.") {
        return setIsError((prev) => ({
          ...prev,
          usernameNotFound: false,
          invalidToken: false,
          isExpired: true,
          samePassword: false,
        }));
      }

      setIsError((prev) => ({
        ...prev,
        usernameNotFound: false,
        invalidToken: true,
      }));

      setIsLoading(false);
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

  return (
    <div style={{ marginTop: "150px" }}>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Box p={5}>
            {isError.usernameNotFound && showErrorAlert("User not registered.")}
            {isError.invalidToken && showErrorAlert("Something went wrong.")}
            {isError.samePassword &&
              showErrorAlert("Please don't use your old password.")}
            {isError.isExpired &&
              showErrorAlert(" Token is expired, please request again.")}

            <Typography variant="h4" mb={2} align="center">
              {isNoParams ? "Reset your password" : "Create new password"}
            </Typography>

            <Typography variant="subtitle1" mb={2} align="center">
              {isNoParams
                ? "    Enter your username so we can send you a message on how to reset your password."
                : "Your new password must be different from previous used password."}
            </Typography>

            {isNoParams ? (
              <Formik
                initialValues={{ username: "" }}
                onSubmit={handleForgotPasswordSubmit}
                validationSchema={resetPasswordValidationSchema}
              >
                {({ handleChange, values, touched, errors }) => (
                  <>
                    <Form>
                      <Field
                        id="username"
                        component={TextField}
                        onChange={handleChange}
                        label="Username"
                        fullWidth
                        margin="dense"
                        value={values.username}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                      <Button
                        sx={{ mt: 2 }}
                        fullWidth
                        disableElevation
                        disableFocusRipple
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <CircularProgress
                            sx={{ position: "absolute", right: "50px" }}
                            size={17}
                          />
                        )}
                        Send instructions
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                onSubmit={handleCreateNewPasswordSubmit}
                validationSchema={createNewPasswordValidationSchema}
              >
                {({ handleChange, values, touched, errors }) => (
                  <>
                    <Form>
                      <Field
                        id="password"
                        component={TextField}
                        onChange={handleChange}
                        label="Password"
                        fullWidth
                        margin="dense"
                        value={values.password}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        type={isShowPassword.password ? "text" : "password"}
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
                        id="confirmPassword"
                        component={TextField}
                        onChange={handleChange}
                        label="Confirm password"
                        fullWidth
                        margin="dense"
                        value={values.confirmPassword}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        type={
                          isShowPassword.confirmPassword ? "text" : "password"
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
                        sx={{ mt: 2 }}
                        fullWidth
                        disableElevation
                        disableFocusRipple
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <CircularProgress
                            sx={{ position: "absolute", right: "50px" }}
                            size={17}
                          />
                        )}
                        Reset password
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
