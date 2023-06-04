import { useState, forwardRef, useRef } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Textfield from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";

import { getInTouchFormValidationSchema } from "@utils/formValidationSchema";
import useAnimate from "@/lib/useAnimate";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const [isOpenSnackbar, setIsOpenSnackBar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const animRef = useRef(null);

  const animate = useAnimate(animRef);

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    try {
      setIsLoading(true);

      await axios.post("/api/v1/email", values);

      setIsOpenSnackBar(true);

      setIsLoading(false);

      resetForm();
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  const handleSnackbarOnClose = () => {
    setIsOpenSnackBar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: "200px" }}>
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={2500}
        onClose={handleSnackbarOnClose}
      >
        <Alert
          onClose={handleSnackbarOnClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Message successfully send!
        </Alert>
      </Snackbar>
      <Typography align="center" variant="h3" pb={2}>
        Get in touch
      </Typography>
      <>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={getInTouchFormValidationSchema}
        >
          {({ handleChange, touched, errors, values }) => (
            <Box ref={animRef}>
              <Fade in={animate} style={{ transitionDelay: "100ms" }}>
                <Container>
                  <Form>
                    <Grid container>
                      <Grid container item spacing={isMediumScreenSize ? 0 : 2}>
                        <Grid item xs={12} md={6}>
                          <Field
                            component={Textfield}
                            label="First name"
                            fullWidth
                            margin="dense"
                            id="firstName"
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            onChange={handleChange}
                            value={values.firstName || ""}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Field
                            component={Textfield}
                            label="Last name"
                            fullWidth
                            margin="dense"
                            id="lastName"
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            onChange={handleChange}
                            value={values.lastName || ""}
                          />
                        </Grid>
                      </Grid>

                      <Field
                        component={Textfield}
                        fullWidth
                        label="Email"
                        margin="dense"
                        id="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        onChange={handleChange}
                        value={values.email || ""}
                      />

                      <Field
                        component={Textfield}
                        fullWidth
                        label="Message"
                        margin="dense"
                        multiline
                        minRows={8}
                        id="message"
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                        onChange={handleChange}
                        value={values.message || ""}
                      />
                    </Grid>

                    <Button
                      fullWidth
                      disableElevation
                      disableRipple
                      variant="contained"
                      sx={{ mt: "5px" }}
                      type="submit"
                    >
                      Send
                    </Button>
                  </Form>
                </Container>
              </Fade>
            </Box>
          )}
        </Formik>
      </>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default Contact;
