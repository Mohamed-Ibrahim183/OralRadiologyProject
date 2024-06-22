import React, { useContext, useEffect, useReducer, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ContextData } from "./ContextData";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, current: action.payload };
    default:
      return state;
  }
}

const Root = () => {
  const { mode, currentUser } = useContext(ContextData);
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
