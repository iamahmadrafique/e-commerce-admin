import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  id: number | undefined;
  handleClosePopUp: () => any;
  handleRemove: () => any;
  from: string;
};

export default function ConfirmationAlert(props: Props) {
  const { id, handleClosePopUp, handleRemove, from } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    handleClosePopUp();
  };
  const handleYes = () => {
    setOpen(false);
    handleRemove(id);
  };
  React.useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are your sure to delete this record ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
