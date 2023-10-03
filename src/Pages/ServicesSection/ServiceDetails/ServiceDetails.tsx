import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';

type Props = {
  data: any;
  selectedRow;
  handleEditData;
  editable;
  setEditable;
  setActiveAction;
  handleUpdate;
  updateLoader;
  updatingService;
  setOpen;
  setAlertMessage;
  handleEditImage;
};

export function ServiceDetails(props: Props) {
  const {
    data,
    setActiveAction,
    setEditable,
    selectedRow,
    handleEditData,
    editable,
    handleUpdate,
    updateLoader,
    updatingService,
    setOpen,
    setAlertMessage,
    handleEditImage
  } = props;
  const [newKeyPoints, setNewKeyPoints] = useState<Array<string>>(
    data[selectedRow]?.keyPoints
  );

  return (
    <Box className="w-full md:w-2/3 xl:w-2/3 pt-5 pb-10 px-5 shadow-2xl box-shadow">
      <span>
        <span className="font-bold text-xl">Product Details</span>
        <br />
        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          disabled={!editable}
          value={updatingService?.inventoryLevel}
          onChange={(e) => {
            handleEditData(e, "inventoryLevel", selectedRow);
          }}
          label="InventoryLevel"
          placeholder="Should be like 20, 30 etc"
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
        <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          value={updatingService?.inventoryStatus}
          disabled={!editable}
          onChange={(e) => {
            handleEditData(e, "inventoryStatus", selectedRow);
          }}
          label="Inventory Status"
          placeholder="Should be like Current or Out of stock"
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
         <TextField
          id="outlined-error-helper-text"
          autoComplete="off"
          value={updatingService?.stockLevel}
          disabled={!editable}
          onChange={(e) => {
            handleEditData(e, "stockLevel", selectedRow);
          }}
          label="Inventory Status"
          placeholder="Should be like 50, 100 etc"
          className="w-full mt-2 sm:mt-16 "
          type="text"
          sx={{ width: "100%", marginTop: "35px", height: "48px" }}
        />
        
      <span
        className={`flex items-center justify-center ${!editable && "hidden"}`}
      >
        <Button
          variant="outlined"
          sx={{
            marginTop: "50px",
            width: "100px",
            background: "white",
            fontWeight: "600",
            marginRight: "20px",
            color: "red",
            border: "1px solid red",
            "&:hover": {
              border: "1px solid gray",
            },
          }}
          onClick={() => {
            setEditable(false);
            setActiveAction("grid");
          }}
        >
          Cancel
        </Button>
        {updateLoader ? (
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
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </Button>
        )}
      </span>
      </span>
    </Box>
  );
}
 