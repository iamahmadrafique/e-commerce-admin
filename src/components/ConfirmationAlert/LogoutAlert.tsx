import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import UseApprovalsApiCalls from "../../hooks/useApprovalsApiCalls";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handleLogout: () => any;
  handleClosePopUp: () => any;
};

export default function LogoutAlert(props: Props) {
  const { handleLogout, handleClosePopUp } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    handleClosePopUp();
  };
  const handleYes = () => {
    handleLogout();
    setOpen(false);
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
        <DialogTitle style={{width: '300px'}}>
          Logout Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure to Logout?`}
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
