import { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from "formik";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Textfield from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { getInTouchFormValidationSchema } from "@utils/formValidationSchema";
import useAnimate from "@/lib/useAnimate";
import ToastMessage from "./ToastMessage";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const formInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const Contact = () => {
  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const [isOpenToastMessage, setIsOpenToastMessage] = useState(false);

  const [reCaptchaToken, setReCaptchaToken] = useState("");

  const [isReCaptchaModalOpen, setIsReCaptchaModalOpen] = useState(false);

  const [formValue, setFormValue] = useState(formInitialValues);

  const [isLoading, setIsLoading] = useState(false);

  const animRef = useRef(null);

  const formikRef = useRef<any>();

  const animate = useAnimate(animRef);

  const handleSubmitFromReCaptcha = async (value: string | null) => {
    setReCaptchaToken(value!);
    setIsReCaptchaModalOpen(false);

    try {
      setIsLoading(true);

      await axios.post("/api/v1/getInTouch", formValue);

      setIsOpenToastMessage(true);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }

    //@ts-ignore
    formikRef?.current.resetForm();

    setIsLoading(false);
  };

  const handleSubmit = async (values: FormValues) => {
    setIsReCaptchaModalOpen(true);

    if (reCaptchaToken === "") setIsReCaptchaModalOpen(true);

    setFormValue(values);
  };

  const handleToastMessageClose = () => {
    setIsOpenToastMessage(false);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: "200px" }}>
      <ToastMessage
        onClose={handleToastMessageClose}
        isOpen={isOpenToastMessage}
        message="Message successfully send."
      />

      <Typography align="center" variant="h3" pb={2}>
        Get in touch
      </Typography>
      <>
        <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={getInTouchFormValidationSchema}
          innerRef={formikRef}
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
      <Dialog
        open={isReCaptchaModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA!}
            onChange={handleSubmitFromReCaptcha}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Contact;
