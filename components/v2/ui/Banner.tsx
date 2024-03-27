import { FC } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

interface BannerProps {
  message: string;
  isOpen: boolean;
  onBannerClose?: () => void;
}

const Banner: FC<BannerProps> = ({ message, isOpen, onBannerClose }) => {
  return (
    <Grow in={isOpen}>
      <Snackbar open={isOpen}>
        <Alert
          variant="filled"
          severity="info"
          sx={{
            bgcolor: "primary.main",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            {message}
            <CloseIcon
              sx={{ ml: 1, cursor: "pointer" }}
              onClick={onBannerClose}
            />
          </Box>
        </Alert>
      </Snackbar>
    </Grow>
  );
};

export default Banner;
