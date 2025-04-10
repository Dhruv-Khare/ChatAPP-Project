import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={deleteHandler}>
          Yes
        </Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
