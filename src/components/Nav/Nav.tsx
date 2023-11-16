import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./Nav.module.css";

const NavBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      className={`${styles.stickyCard} ${styles.toolbar}`}
    >
      <Toolbar>
        <Typography variant="h6">Task Management App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
