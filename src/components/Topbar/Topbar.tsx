import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  from: string;
  handleDrawerToggle: any;
}

export default function Topbar(props: Props) {
  const {handleDrawerToggle, from } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: '#F5F5F5',
      }}
    >
      <Toolbar className="w-full">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" }, color: 'gray' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" className='w-full'>
          <ul className='w-full flex items-center justify-center flex-wrap font-bold text-3xl tracking-wider' style={{color: '#EA1717'}}>
              {from}
          </ul>
        </Typography>
        <Avatar>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}
