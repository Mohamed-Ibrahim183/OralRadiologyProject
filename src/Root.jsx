import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ContextData } from "./ContextData";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Components/Navbar/Navbar";

const Root = () => {
  const { mode } = useContext(ContextData);
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
