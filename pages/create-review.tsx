import { useState } from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createReviewValidationSchema } from "@utils/formValidationSchema";
import ToastMessage from "@/components/ToastMessage";

const CreateReview = () => {
  const router = useRouter();

  const token = Cookie.get("token");

  const [isCreateReviewLoading, setIsCreateReviewLoading] = useState(false);

  const [isOpenToastMessage, setIsOpenToastMessage] = useState(false);

  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.only("xs"));

  const handleOnSubmit = async (
    values: { text: string },
    { resetForm }: any
  ) => {
    setIsCreateReviewLoading(true);

    await axios.post("/api/v1/review", values, {
      headers: { Authorization: token },
    });

    setIsCreateReviewLoading(false);
    setIsOpenToastMessage(true);

    resetForm();

    setIsCreateReviewLoading(false);
  };

  const handleToastMessageClose = () => {
    setIsOpenToastMessage(false);
  };

  const handleBackClick = () => {
    router.replace("/", undefined, { scroll: false });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <ToastMessage
        onClose={handleToastMessageClose}
        isOpen={isOpenToastMessage}
        message="Review successfully submitted."
      />
      <Container maxWidth="md">
        <Box sx={{ display: "block", margin: "auto" }}>
          <Paper elevation={3}>
            <Box sx={{ p: isMediumScreenSize ? 1.5 : 5 }}>
              <Typography variant={isMediumScreenSize ? "h5" : "h4"} mb={2}>
                Create review
              </Typography>

              <Alert severity="warning" sx={{ mb: 2, width: "fit-content" }}>
                Admin needs to approve your review before it to display on the
                website.
              </Alert>

              <Formik
                initialValues={{
                  text: "",
                }}
                onSubmit={handleOnSubmit}
                validationSchema={createReviewValidationSchema}
              >
                {({ touched, errors, handleChange, values }) => (
                  <Form>
                    <Field
                      component={TextField}
                      fullWidth
                      value={values.text || ""}
                      id="text"
                      multiline
                      minRows={15}
                      error={touched.text && Boolean(errors.text)}
                      helperText={touched.text && errors.text}
                      onChange={handleChange}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        onClick={handleBackClick}
                        sx={{ mt: 2 }}
                        size="large"
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                      >
                        Back
                      </Button>

                      <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                        type="submit"
                      >
                        submit
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCreateReviewLoading}
      >
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
};

export default CreateReview;
