import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function AlertMessage(props) {
  const { open, setOpen, alertMessage, setIsError, isError, from } = props;
  useEffect(() => {
    if (open) {
      setTimeout(function () {
        setOpen(false);
        setIsError(false);
      }, 5000);
    }
  }, [open]);

  return (
    <Collapse
      in={open}
      className="fixed z-50 top-10 mt-32 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <Alert
        severity={`${isError ? "error" : "success"}`}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={isError ? { mb: 2, backgroundColor: "red", color: "white" } : {}}
      >
        {alertMessage}
      </Alert>
    </Collapse>
  );
}

export default AlertMessage;
