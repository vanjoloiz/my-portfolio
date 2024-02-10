import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteDialogInterface {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
}

const DeleteDialog: FC<DeleteDialogInterface> = ({ isOpen, onClose, onOk }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>{"Please confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You&apos;re about to delete your review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
