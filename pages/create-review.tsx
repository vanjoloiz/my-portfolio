import { useState, forwardRef } from "react";
import { Form, Formik, Field } from "formik";
import useSWR from "swr";
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
import Snackbar from "@mui/material/Snackbar";
import { createReviewValidationSchema } from "@utils/formValidationSchema";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateReview = () => {
  const router = useRouter();

  const { data: reviews, mutate } = useSWR("/api/v1/review?pageNumber=1`");

  const token = Cookie.get("token");

  const [isCreateReviewLoading, setIsCreateReviewLoading] = useState(false);

  const [isOpenSnackbar, setIsOpenSnackBar] = useState(false);

  const handleOnSubmit = async (
    values: { text: string },
    { resetForm }: any
  ) => {
    setIsCreateReviewLoading(true);

    try {
      const { data } = await axios.post("/api/v1/review", values, {
        headers: {
          Authorization: token,
        },
      });

      await mutate([...reviews, data], true);
      setIsCreateReviewLoading(false);
      setIsOpenSnackBar(true);
    } catch {}

    resetForm({});

    setIsCreateReviewLoading(false);
  };

  const handleSnackbarOnClose = () => {
    setIsOpenSnackBar(false);
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
          Review successfully submitted!
        </Alert>
      </Snackbar>
      <Container maxWidth="md">
        <Box sx={{ display: "block", margin: "auto" }}>
          <Paper elevation={3}>
            <Box sx={{ p: 5 }}>
              <Typography variant="h4" mb={2}>
                Create a review
              </Typography>

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
                      color="secondary"
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
                        onClick={() =>
                          router.replace("/", undefined, { scroll: false })
                        }
                        sx={{ mt: 2 }}
                        size="large"
                        color="secondary"
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                      >
                        Back
                      </Button>

                      <Button
                        sx={{ mt: 2 }}
                        color="secondary"
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
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CreateReview;
