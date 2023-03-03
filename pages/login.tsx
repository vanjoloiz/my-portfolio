import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Cookie from 'js-cookie';
import axios from 'axios';
import { Form, Formik, Field } from 'formik';
import { loginValidationSchema } from '@utils/formValidationSchema';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState({ isShow: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post('/api/v1/auth', values);

      setError({ isShow: false, message: '' });

      Cookie.set('token', data);

      setIsLoading(false);

      router.push('/');
    } catch (err: any) {
      setError({
        isShow: true,
        message: err.response.data,
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main style={{ marginTop: '150px' }}>
        <Container maxWidth='md'>
          <Box sx={{ width: '600px', display: 'block', margin: 'auto' }}>
            <Paper elevation={3}>
              <Box p={6}>
                {error.isShow && (
                  <Alert severity='error' sx={{ mb: 2 }}>
                    {error.message}
                  </Alert>
                )}
                <Typography variant='h4' mb={2}>
                  Login
                </Typography>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  onSubmit={handleSubmit}
                  validationSchema={loginValidationSchema}
                >
                  {({ touched, errors, handleChange }) => (
                    <Form>
                      <Field
                        component={TextField}
                        color='secondary'
                        label='Username'
                        fullWidth
                        margin='dense'
                        id='username'
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        onChange={handleChange}
                      />

                      <Field
                        component={TextField}
                        color='secondary'
                        label='Password'
                        fullWidth
                        type='password'
                        margin='dense'
                        id='password'
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        onChange={handleChange}
                      />

                      <Button
                        sx={{ mt: 2, mb: 2 }}
                        fullWidth
                        color='secondary'
                        variant='contained'
                        disableElevation
                        disableFocusRipple
                        type='submit'
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <CircularProgress
                            sx={{ position: 'absolute', right: '50px' }}
                            size={17}
                          />
                        )}
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
                <Link href='/signup' color='inherit'>
                  Don&apos; t have an account? Sign Up
                </Link>
              </Box>
            </Paper>
          </Box>
          <div style={{ marginTop: '10px' }}>
            <Footer />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Login;
