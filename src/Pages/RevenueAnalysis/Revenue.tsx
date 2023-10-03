import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import { MenuItem, Select} from "@mui/material";
import Topbar from "../../components/Topbar/Topbar.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../components/AlertMessage/AlertMessage.tsx";
import { useRecoilState } from "recoil";
import RevenueAnalysis from "./AnalysisSection/RevenueAnalysisSection.tsx";
import RevenueGrid from "./RevenueGrid/RevenueGrid.tsx";
import { RevenueAtom } from "../../recoil/RevenueAtom/RevenueAtom.ts";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}


export default function Revenue(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

    const [revenueDetails, setRevenueDetails] =
    useRecoilState(RevenueAtom);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const categories = ['All', 'Clothing', 'Electronics', 'Furniture'];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <Box className="h-screen" sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar handleDrawerToggle={handleDrawerToggle} from="Revenue Analysis" />
      <Sidebar
        from="Revenue"
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
        {loader ? (
          <Box className="w-full grid-height flex items-center justify-center">
            <CircularProgress sx={{ color: "red" }} />
          </Box>
        ) : (
          <Box className="w-full layout-height mt-10 sm:mt-10 sm:shadow-2xl sm:box-shadow rounded-lg flex flex-col items-center justify-start">
              <RevenueAnalysis />
              <Box className="w-full mt-2 mb-2 pl-3 flex items-center justify-start">
                <p className='pr-2'>Filter by: </p>
              <Select
              label=""
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            </Box>
              <Box className="w-72 sm:w-full grid-height -mt-3 px-3">
              <RevenueGrid data={revenueDetails} searchInput={selectedCategory}/>
              </Box>
          </Box>
        )}
      </Box>
      {open && (
        <AlertMessage
          open={open}
          setOpen={setOpen}
          alertMessage={alertMessage}
          isError={isError}
          setIsError={setIsError}
          from="Topbar"
        />
      )}
    </Box>
  );
}
