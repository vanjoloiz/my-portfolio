import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ReviewModal = ({ review, isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" marginBottom={3} fontStyle="italic">
            By {review.authorFirstName} {review.authorLastName} |{" "}
            {review.createdAt && format(review.createdAt, "d MMMM yyyy")}
          </Typography>
          <CloseRoundedIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>

        <Typography variant="h5" fontWeight="bold" marginBottom={3}>
          {review.title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ whiteSpace: "pre-wrap" }}
          marginBottom={3}
        >
          {review.text}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ReviewModal;
