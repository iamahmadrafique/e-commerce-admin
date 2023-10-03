import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { images } from "../../../assets/Images.ts";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import { ManagementAtom } from "../../../recoil/ManagementAtom/ManagementAtom.ts";
import { useRecoilState } from "recoil";

type Props = {
  data: any;
  setActiveAction;
  setServices;
  setOpen;
  setAlertMessage;
  setIsError;
};
  
export function AddNewService(props: Props) {
  const {
    data,
    setActiveAction,
    setServices,
    setOpen,
    setIsError,
    setAlertMessage,
  } = props;
  const [newDescription, setNewDescription] = useState("");
  const [newInventoryLevel, setNewInventoryLevel] = useState("");
  const [newInventoryStatus, setNewInventoryStatus] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newStockLevel, setNewStockLevel] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [preview, setPreview] = useState();
  const [newKeyPoints, setNewKeyPoints] = useState<Array<string>>([]);
  const [loader, setLoader] = useState(false);
  const [fileLoader, setFileLoader] = useState(false);
  const [allServiceDetails, setAllServiceDetails] =
    useRecoilState(ManagementAtom);

  const handleProfile = (event) => {
    console.log("profile is ", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleUploadFile = async (e: any) => {
    setFileLoader(true);
    try{
      var formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await axios.post(
        `https://codexiatech.dev/southbay/upload.php`, formData, 
        {
          headers: { 
            'Content-Type' : 'multipart/form-data',
            'Accept' : 'application/json'
          },
          withCredentials: false,
        }
      );
      if(response){
        console.log('response url is : ', response.data.fileUrl);
        setPreview(response.data.fileUrl);
        
        setTimeout(function () {
           setFileLoader(false);
           setAlertMessage('File is successfully uploaded')
           setOpen(true);
        }, 5000);
      }
    }catch(err){
      console.log('err is : ', err);
      setFileLoader(false);
    }
  }
  const handleNewSubmit = () => {
    setLoader(true);
    const id = data[data.length - 1].id + 1;
    console.log("id is ", id);
    let obj = {
      id: allServiceDetails.length+1,
      inventoryStatus: newInventoryStatus,
      inventoryLevel: Number(newInventoryLevel),
      productName: newProductName,
      productDescription: newDescription,
      price: Number(newProductPrice),
      stockLevel: Number(newStockLevel),
      image: preview,
    }
    let tempData = [...allServiceDetails];
    tempData.unshift(obj);
    setAllServiceDetails(tempData);
        setOpen(true);
        setLoader(false);
        setOpen(true);
        setAlertMessage("New Product is successfully Added");
        setIsError(false);
        setActiveAction("grid");
    
  };
  
  return (
    <Box className="w-full h-96 overflow-scroll md:w-2/3 xl:w-2/3 pt-5 pb-10 px-5 shadow-2xl box-shadow">
      <span>
        <span className="font-bold text-xl">New Product</span>
        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          value={newInventoryLevel}
          placeholder=""
          onChange={(e) => {
            setNewInventoryLevel(e.target.value);
          }}
          label="Inventory Level"
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          value={newInventoryStatus}
          placeholder=""
          onChange={(e) => {
            setNewInventoryStatus(e.target.value);
          }}
          label="Inventory Status"
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          value={newStockLevel}
          onChange={(e) => {
            setNewStockLevel(e.target.value);
          }}
          label="Stock Level"
          placeholder=" "
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
        <span className="w-full flex flex-col md:flex-row items-center justify-center">
          <TextField
            id="outlined-error-helper-text"
            autoComplete="off"
            label="Product Name"
            placeholder=""
            value={newProductName}
            onChange={(e) => {
              setNewProductName(e.target.value);
            }}
            className="w-full mt-2 sm:mt-16 "
            type="text"
            sx={{ marginTop: "35px", height: "48px" }}
          />
          
        </span>

        <span className="w-full flex flex-col md:flex-row items-center justify-center">
          <TextField
            id="outlined-error-helper-text"
            autoComplete="off"
            label="Product Price"
            placeholder=""
            value={newProductPrice}
            onChange={(e) => {
              setNewProductPrice(e.target.value);
            }}
            className="w-full mt-2 sm:mt-16 "
            type="text"
            sx={{ marginTop: "35px", height: "48px" }}
          />
          
        </span>

        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          label="Description"
          placeholder="Should be less than 300 characters "
          multiline
          rows={4}
          value={newDescription}
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />

        <Box className="flex items-center justify-start mt-24 mb-10">
          <span className="text-left">
            <h1>Product Image</h1>
            <p className={`text-xs text-red-600`}>
              Dimension must be: (1440 x 505)
            </p>
          </span>
          <Box
            className={` w-20 h-20 lg:w-36 lg:h-24 xl:w-72 xl:h-40 ml-5 md:ml-5 bg-gray-100 border border-1 border-gray-300 `}
          >
            <img
              src={preview ? preview : images.cameraIcon}
              alt="profilePreview"
              className={`w-full h-full ${
                preview ? "object-contain" : "object-contain"
              }`}
            />
            {fileLoader && (
              <div className="UnlockingImg w-36 h-24 xl:w-72 xl:h-40 -mt-24 xl:-mt-40 bg-gray-200 relative z-20 flex items-center justify-center">
                <CircularProgress sx={{ color: "red" }} />
              </div>
            )}
            <Box
              className={`relative bg-white w-5 h-5 lg:w-7 lg:h-7 rounded-full ml-16  lg:ml-32 -mt-3 lg:-mt-4 xl:ml-auto xl:-mr-4 flex items-center justify-center `}
            >
              <Box component="label" className="w-5 h-5 lg:w-7 lg:h-7">
                <AddIcon className="text-red-500 cursor-pointer rounded-full hover:bg-blue-100" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e)=>{handleUploadFile(e)}}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </span>
      <span className="flex items-center justify-center">
        {loader ? (
          <Box className="" sx={{ width: "100px", marginTop: "50px" }}>
            <CircularProgress sx={{ color: "red" }} />{" "}
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{
              marginTop: "50px",
              width: "100px",
              background: "red",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={handleNewSubmit}
          >
            Submit
          </Button>
        )}
      </span>
    </Box>
  );
}
