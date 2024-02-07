import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";

const ReviewModal = ({ isOpen, onClose }: any) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <Container maxWidth="md" sx={{ p: 5 }}>
          <Typography
            align="center"
            sx={{
              typography: { xs: "h2", md: "h2" },
              fontWeight: "bold !important",
            }}
          >
            Coming Soon!
          </Typography>
        </Container>
      </Dialog>
    </>
  );
};

export default ReviewModal;
