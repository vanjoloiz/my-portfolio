import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  username: yup.string().required('Please enter your username.'),
  password: yup.string().required('Please Enter your password.'),
});

export const signupValidationSchema = yup.object({
  firstName: yup.string().required('Please enter your First name.'),
  lastName: yup.string().required('Please enter your Last name.'),
  username: yup.string().required('Please enter your Username.'),
  password: yup
    .string()
    .required('Please enter your Password.')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),
});
