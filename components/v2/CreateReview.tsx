import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import HeadTags from "./HeadTags";
import { createReviewValidationSchema } from "@utils/formValidationSchema";
import { REVIEW_TEXT_MAXIMUM_LENGTH } from "@utils/constants";
import { BASE_URL } from "@utils/baseUrl";
import ToastMessage from "./ToastMessage";

const CreateReview = () => {
  const [textRemaining, setTextRemaining] = useState(
    REVIEW_TEXT_MAXIMUM_LENGTH
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenToastMessage, setIsOpenToastMessage] = useState(false);
  const [isOpenWarningAlert, setIsOpenWarningAlert] = useState(false);

  const textAreaHelperText = `${textRemaining} characters remaining / 5000`;

  const handleCreateReviewSubmit = async (values: any, { resetForm }: any) => {
    const token = Cookie.get("token");

    setIsLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/v1/review`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsOpenToastMessage(true);
      setIsOpenWarningAlert(true);
    } catch (err) {
      console.error(err);
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  const handleToastMessageClose = () => setIsOpenToastMessage(false);

  return (
    <>
      <HeadTags title="Create Review" />
      <ToastMessage
        onClose={handleToastMessageClose}
        isOpen={isOpenToastMessage}
        message="Review successfully submitted."
      />
      {isOpenWarningAlert && (
        <Alert severity="warning" sx={{ mb: 2, width: "fit-content" }}>
          Admin needs to approve your review before it to display on the
          website.
        </Alert>
      )}

      <Formik
        validationSchema={createReviewValidationSchema}
        initialValues={{
          title: "",
          text: "",
        }}
        onSubmit={handleCreateReviewSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Field
              component={TextField}
              id="title"
              value={values.title}
              onChange={handleChange}
              rows={24}
              placeholder="Review title"
              fullWidth
              margin="dense"
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <Field
              component={TextField}
              id="text"
              value={values.text}
              onChange={(e: any) => {
                handleChange(e);
                setTextRemaining(
                  REVIEW_TEXT_MAXIMUM_LENGTH - e.target.value.length
                );
              }}
              multiline
              rows={20}
              fullWidth
              margin="dense"
              placeholder="Write your review here.."
              error={touched.text && Boolean(errors.text)}
              helperText={(touched.text && errors.text) || textAreaHelperText}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableRipple
              disableFocusRipple
              sx={{ mt: 1 }}
            >
              Submit
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  sx={{ position: "absolute", right: "50px" }}
                  size={17}
                />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateReview;
