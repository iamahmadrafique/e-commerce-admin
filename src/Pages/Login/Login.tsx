import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { images } from "../../assets/Images.ts";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, helpers) => {
    setFormSubmit(true);
    try {
      setLoader(true);
      if(values.email === "admin@ecommerce.com" && values.password === "123456"){
        localStorage.setItem('fpsbAdminToken', '123456');
        navigate("/");
        setLoader(false);
      }else{
        setAlertMessage("Invalid Credentials");
        setOpen(true);
        setLoader(false);
      }
    } catch (error) {
      helpers.setErrors({ submit: error.message });
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnChange: formSubmit,
    validateOnBlur: formSubmit,
    onSubmit: onSubmit,
  });
  useEffect(() => {
    if (open) {
      setTimeout(function () {
        setOpen(false);
      }, 2000);
    }
  }, [open]);
  return (
    <Box className="w-full h-screen flex items-center justify-center">
      <Box className="w-72">
        <Box className="w-full">
          <img src="https://www.swampscottlibrary.org/wp-content/uploads/logo.gif" className="w-full" alt='logo' />
        </Box>
        <Box className="w-full flex flex-col items-center justify-center">
          <h1 className="mt-14 font-semibold text-gray-600 text-lg">
            E-commerce Admin
          </h1>
          <p className="mt-2 text-gray-600 text-sm">Enter your login details</p>
          <form className="w-full mt-2" onSubmit={formik.handleSubmit}>
            <span className="flex items-center justify-start w-full">
              <TextField
                error={formik.errors.email}
                name="email"
                id="filled-error-helper-text"
                label="Email"
                helperText={formik.errors.email}
                onBlur={formik.handleChange}
                variant="filled"
                className="h-5 focus:outline-none px-2 rounded w-full"
                sx={{ input: { background: "#f3f3f7;" } }}
                type="email"
              />
            </span>
            <span className="flex flex-col sm:flex-row sm:items-center justify-start mt-14 w-full">
              <TextField
                id="standard-error-helper-text"
                name="password"
                error={formik.errors.password}
                helperText={formik.errors.password}
                onBlur={formik.handleChange}
                label="Password"
                variant="filled"
                className="h-5 focus:outline-none px-2 rounded w-full"
                type="password"
                sx={{ input: { background: "#f3f3f7;" } }}
              />
            </span>
            {loader ? (
              <Box className="w-full" sx={{ marginTop: "60px" }}>
                {" "}
                <CircularProgress sx={{color: 'red'}}/>
              </Box>
            ) : (
              <Button
                variant="contained"
                type="submit"
                disabled={!formik.isValid}
                onClick={() => {
                  setFormSubmit(true);
                }}
                className="w-full"
                sx={{
                  marginTop: "70px",
                  background: "red",
                  "&:hover": { background: "white", color: "red" },
                }}
              >
                Login
              </Button>
            )}
          </form>
        </Box>
      </Box>
      <Collapse
        in={open}
        className="fixed top-10 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <Alert
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
          sx={{ mb: 2, backgroundColor: "red", color: "white" }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default Login;
