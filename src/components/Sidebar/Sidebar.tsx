import React,{useState} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import LogoutAlert from "../ConfirmationAlert/LogoutAlert.tsx";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: any;
  from: string;
}

export default function Sidebarr(props: Props) {
  const navigate = useNavigate();
  const { window, handleDrawerToggle, mobileOpen, from } = props;
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const handleLogout = () => {
    localStorage.setItem('fpsbAdminToken', '');
    navigate('/Login');
    window.location.reload();
  }
  const handleOpenPopUp = () => {
    setOpenDeletePopUp(true);
  };
  const handleClosePopUp = () => {
    setOpenDeletePopUp(false);
  };
  const drawer = (
    <div>
      <Box>
        <Box className="w-full flex items-center justify-center my-2">
          <img src="https://www.swampscottlibrary.org/wp-content/uploads/logo.gif" className="w-4/5 -ml-3" alt="logo" />
        </Box>
      </Box>
      {/* <Divider /> */}
      <List sx={{ marginTop: "70px" }}>
      <Link to="/">
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                background: `${from === "Revenue" ? "#EA1717" : ""}`,
                color: `${from === "Revenue" ? "white" : ""}`,
              }}
            >
              <ListItemIcon>
                <TrendingUpIcon
                  sx={{ color: `${from === "Revenue" ? "white" : ""}` }}
                />
              </ListItemIcon>
              <ListItemText primary={"Revenue"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/InventoryManagement">
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                background: `${from === "Management" ? "#EA1717" : ""}`,
                color: `${from === "Management" ? "white" : ""}`,
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: `${from === "Management" ? "white" : ""}` }} />
              </ListItemIcon>
              <ListItemText primary={"Management"} />
            </ListItemButton>
          </ListItem>
        </Link>
        
       
        <span className='fixed z-20 bottom-5 left-0 xl:pl-10'>
        <Link to="#" onClick={handleOpenPopUp}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                background: `${from === "Logout" ? "#EA1717" : ""}`,
                color: `${from === "Logout" ? "white" : ""}`,
              }}
            >
              <ListItemIcon>
                <LogoutIcon
                  sx={{ color: `${from === "Logout" ? "white" : ""}` }}
                />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </Link>
        </span>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      {openDeletePopUp ? (
        <LogoutAlert
          handleClosePopUp={handleClosePopUp}
          handleLogout={handleLogout}
        />
      ) : (
        ""
      )}
    </Box>
  );
}
