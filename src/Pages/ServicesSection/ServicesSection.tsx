import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AlertMessage from "../../components/AlertMessage/AlertMessage.tsx";
import { AddNewService } from "./AddNewService/AddNewService.tsx";
import { ServiceDetails } from "./ServiceDetails/ServiceDetails.tsx";
import ServicesGrid from "./ServicesGrid/ServicesGrid.tsx";
import { useRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { ManagementAtom } from "../../recoil/ManagementAtom/ManagementAtom.ts";
import Topbar from "../../components/Topbar/Topbar.tsx";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ServicesSection(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState();
  const [editable, setEditable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [updatingService, setUpdatingService] = useState<any>();
  const [activeAction, setActiveAction] = useState("grid");
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('Current');
  const [loader, setLoader] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [allServiceDetails, setAllServiceDetails] =
    useRecoilState(ManagementAtom);
 
  const [services, setServices] = useState([]);

  useEffect(() => {
  }, [profile]);

  useEffect(() => {
    if (allServiceDetails.length > 0) {
      let tempSliders = [];
      for (let i = 0; i < allServiceDetails.length; i++) {
        if (allServiceDetails[i]) {
          tempSliders.push(allServiceDetails[i]);
        }
      }
      setServices(tempSliders);
      setLoader(false);
    } else {
      getServicesData();
    }
  }, [allServiceDetails]);

  useEffect(() => {
    setUpdatingService(services[selectedRow]);
  }, [selectedRow]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEditImage = (url, setFileLoader) => {
    setUpdatingService({ ...updatingService, image: url });
    setFileLoader(false);
  }

  const handleEditData = (e, changingKey, index) => {
    if (changingKey === "inventoryLevel") {
      setUpdatingService({ ...updatingService, inventoryLevel: Number(e.target.value) });
    } else if (changingKey === "inventoryStatus") {
      setUpdatingService({ ...updatingService, inventoryStatus: e.target.value });
    } else if (changingKey === "stockLevel") {
      setUpdatingService({ ...updatingService, stockLevel: Number(e.target.value) });
    }
  };

  const handleClosePopUp = () => {
    setOpenDeletePopUp(false);
  };

  const handleUpdate = (newKeyPoints: Array<string>) => {
          let tempUpdatingData = [...allServiceDetails];
          tempUpdatingData[selectedRow] = updatingService;
          setAllServiceDetails(tempUpdatingData);
           setOpen(true);
          setUpdateLoader(false);
          setActiveAction("grid");
          setAlertMessage("Inventory data of product is successfully updated");
          setIsError(false);
          setOpen(true);
          setEditable(false);
  };

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
  };

  return (
    <Box className='w-full h-screen sm:overflow-hidden' sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar handleDrawerToggle={handleDrawerToggle} from="Inventory Management" />
      <Sidebar
        from="Management"
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="mt-16 lg:mt-12"
      >
        <Box className={`w-full sm:shadow-2xl sm:box-shadow px-5 pb-10 mt-1 mt-2 rounded-lg flex flex-col items-center justify-center ${activeAction !== "grid" && 'layout-height justify-start pt-6'}`}>
          <Box
            className={`w-full flex items-center ${
              activeAction === "grid" ? "justify-between" : "justify-between"
            }`}
          >
            <span>
              <span className={`${activeAction === "grid" && "hidden"}`}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    marginRight: "10px",
                    width: "100px",
                    background: "red",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                  onClick={() => {
                    setEditable(false);
                    setActiveAction("grid");
                  }}
                >
                  {" "}
                  <ArrowBackIcon className="text-xl text-white cursor-pointer" />{" "}
                  Back
                </Button>
              </span>
              <span
                className={`h-11 border px-2 border-gray-300 rounded mt-3 md:mt-3 w-28 md:w-32 lg:w-48 xl:w-80 flex items-center justify-between ${
                  activeAction !== "grid" && "hidden"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none h-10 px-3 w-5/6 "
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
                <ClearIcon
                  className="cursor-pointer"
                  sx={{ fontSize: "20px", color: "gray" }}
                  onClick={() => {
                    setSearchInput("");
                  }}
                />
              </span>
              <span
                className={`h-11  rounded mt-3 md:mt-3 w-28 md:w-32 lg:w-48 xl:w-80 flex items-center justify-between ${
                  activeAction !== "grid" && "hidden"
                }`}
              >  
               <p>Filter by Inventory Status: </p>
                <select
            className="border rounded p-2"
            value={selectedView}
            onChange={handleViewChange}
          >
            <option value="Current">Current</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
              </span>
            </span>
            <span>
              <span
                className={`${
                  (editable ||
                    activeAction === "addSlider" ||
                    activeAction === "grid") &&
                  "hidden"
                }`}
              >
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    marginRight: "10px",
                    width: "100px",
                    background: "red",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  Edit
                </Button>
              </span>
              <span className={`${activeAction !== "grid" && "hidden"}`}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    // marginRight: "10px",
                    width: "120px",
                    background: "red",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                  onClick={() => {
                    setActiveAction("addSlider");
                  }}
                >
                  Add New
                </Button>
              </span>
            </span>
          </Box>
          {activeAction === "grid" && (
            <Box className="w-72 sm:w-full grid-height h-96 -mt-3">
             {!loader ? <ServicesGrid
                searchInput={searchInput}
                handleClosePopUp={handleClosePopUp}
                openDeletePopUp={openDeletePopUp}
                setOpenDeletePopUp={setOpenDeletePopUp}
                // handleRemove={handleRemove}
                data={services}
                selectedView={selectedView}
                setSelectedRow={setSelectedRow}
                setActiveAction={setActiveAction}
              /> : <Box className='w-full h-full flex items-center justify-center'><CircularProgress sx={{color: 'red'}}/></Box>}
            </Box> 
          )}
          <span className='w-full h-full'>
          {activeAction === "details" && (
            <Box className="w-full flex items-center justify-center pb-5">
              <ServiceDetails
                setActiveAction={setActiveAction}
                setEditable={setEditable}
                editable={editable}
                data={services}
                selectedRow={selectedRow}
                // handleRemove={handleRemove}
                handleEditData={handleEditData}
                handleUpdate={handleUpdate}
                updateLoader={updateLoader}
                updatingService={updatingService}
                setOpen={setOpen}
                setAlertMessage={setAlertMessage}
                handleEditImage={handleEditImage}
              />
            </Box>
          )}
          {activeAction === "addSlider" && (
            <Box className="w-full flex items-center justify-center pb-5 overflow-scroll">
              <AddNewService
                setActiveAction={setActiveAction}
                data={services}
                setServices={setServices}
                setOpen={setOpen}
                setAlertMessage={setAlertMessage}
                setIsError={setIsError}
              />
            </Box>
          )}
          </span>
        </Box>
      </Box>
      {open && (
        <AlertMessage
          open={open}
          setOpen={setOpen}
          alertMessage={alertMessage}
          isError={isError}
          setIsError={setIsError}
          from="HomeSlider"
        />
      )}
    </Box>
  );
}
