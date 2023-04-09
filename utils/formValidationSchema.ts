import * as yup from "yup";

export const loginValidationSchema = yup.object({
  username: yup.string().required("Please enter your username."),
  password: yup.string().required("Please Enter your password."),
});

export const signupValidationSchema = yup.object({
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  username: yup.string().required("Please enter your username."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password must be at least 8 characters."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords must match."),
});

export const createReviewValidationSchema = yup.object({
  text: yup.string().required("Please enter your review."),
});

export const getInTouchFormValidationSchema = yup.object({
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  email: yup
    .string()
    .required("Please enter your email.")
    .email("Please provide a valid email."),
  message: yup.string().required("Please enter your message."),
});
