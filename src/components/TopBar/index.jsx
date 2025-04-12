import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();

  let rightText = "";

  const matchUserDetail = matchPath("/users/:userId", location.pathname);
  const matchUserPhotos = matchPath("/photos/:userId", location.pathname);

  if (matchUserDetail) {
    const { userId } = matchUserDetail.params;
    const user = models.userModel(userId);
    if (user) {
      rightText = `${user.first_name} ${user.last_name}`;
    }
  } else if (matchUserPhotos) {
    const { userId } = matchUserPhotos.params;
    const user = models.userModel(userId);
    if (user) {
      rightText = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT: Your Name */}
        <Typography variant="h6" color="inherit" noWrap>
          Nguyễn Duy Hai
        </Typography>

        {/* RIGHT: Context info with better layout */}
        <Box
          sx={{
            maxWidth: "50%",
            textAlign: "right",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography variant="h6" color="inherit" noWrap>
            {rightText}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
