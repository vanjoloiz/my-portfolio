import useSWR from "swr";
import { useState, forwardRef } from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
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
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import { createReviewValidationSchema } from "@utils/formValidationSchema";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditReview = () => {
  const router = useRouter();

  const token = Cookie.get("token");

  const reviewId = router.query.id;

  const {
    data: review,
    isLoading,
    mutate,
  } = useSWR(`/api/v1/review/${reviewId}`);

  const [isCreateReviewLoading, setIsCreateReviewLoading] = useState(false);

  const [isOpenSnackbar, setIsOpenSnackBar] = useState(false);

  const theme = useTheme();

  const isMediumScreenSize = useMediaQuery(theme.breakpoints.only("xs"));

  const handleOnSubmit = async (
    values: { text: string },
    { resetForm }: any
  ) => {
    setIsCreateReviewLoading(true);

    mutate({ ...review, text: values.text }, false);

    await axios.put(`/api/v1/review/edit/${reviewId}`, values, {
      headers: { Authorization: token },
    });

    setIsCreateReviewLoading(false);
    setIsOpenSnackBar(true);

    resetForm();

    setIsCreateReviewLoading(false);
  };

  const handleSnackbarOnClose = () => {
    setIsOpenSnackBar(false);
  };

  const handleBackClick = () => {
    router.replace("/", undefined, { scroll: false });
  };

  return (
    <div style={{ marginTop: "150px" }}>
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
          Review successfully edited!
        </Alert>
      </Snackbar>

      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="info" />
        </Backdrop>
      ) : (
        <Container maxWidth="md">
          <Box sx={{ display: "block", margin: "auto" }}>
            <Paper elevation={3}>
              <Box sx={{ p: isMediumScreenSize ? 1.5 : 5 }}>
                <Typography variant={isMediumScreenSize ? "h5" : "h4"} mb={2}>
                  Edit review
                </Typography>

                <Formik
                  enableReinitialize
                  initialValues={{
                    text: review.text,
                  }}
                  onSubmit={handleOnSubmit}
                  validationSchema={createReviewValidationSchema}
                >
                  {({ touched, errors, handleChange, values }) => (
                    <Form>
                      <Field
                        component={TextField}
                        fullWidth
                        value={values.text}
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
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCreateReviewLoading}
      >
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
};

export default EditReview;
