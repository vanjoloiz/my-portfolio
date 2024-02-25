import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import Slide from "@mui/material/Slide";

import Welcome from "./Welcome";

import Contact from "./Contact";
import Login from "./Login";
import SignUp from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordResetSuccess from "./ForgotPasswordResetSuccess";
import ForgotPasswordSendSuccess from "./ForgotPasswordSendSuccess";
import Info from "./Info";
import Reviews from "./Reviews";
import CreateReview from "./CreateReview";
import About from "./About";
import News from "./News";

const LandingPage = ({ reviews, user }: any) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 30px)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        pb: 7,

        textAlign: { xs: "center", lg: "unset" },
      }}
    >
      <Slide direction="left" in={true} timeout={725} unmountOnExit>
        <Container maxWidth="md">
          {router.pathname === "/v2" && <Info />}
          {router.pathname === "/v2/contact" && <Contact />}

          {router.pathname === "/v2/login" && <Login />}
          {router.pathname === "/v2/sign-up" && <SignUp />}
          {router.pathname === "/v2/forgot-password/[[...token]]" && (
            <ForgotPassword />
          )}
          {router.pathname === "/v2/forgot-password/reset-success" && (
            <ForgotPasswordResetSuccess />
          )}
          {router.pathname === "/v2/forgot-password/send-success" && (
            <ForgotPasswordSendSuccess />
          )}

          {router.pathname === "/v2/welcome" && <Welcome user={user} />}

          {router.pathname === "/v2/reviews" && <Reviews reviews={reviews} />}
          {router.pathname === "/v2/create-review" && <CreateReview />}

          {router.pathname === "/v2/about" && <About />}
          {router.pathname === "/v2/news" && <News />}
        </Container>
      </Slide>
    </Box>
  );
};

export default LandingPage;
