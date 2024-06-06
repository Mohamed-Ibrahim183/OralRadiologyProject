import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ContextData } from "./ContextData";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Root = () => {
  const [mode, setMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ContextData.Provider
      value={{
        setMode,
        mode,
        currentUser,
        setCurrentUser,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Outlet />
        </Box>
      </ThemeProvider>
    </ContextData.Provider>
  );
};

export default Root;
