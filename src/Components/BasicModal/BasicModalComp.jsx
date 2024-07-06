import { Box, Modal } from "@mui/material";
import React from "react";

const BasicModalComp = ({ openModal, closeModal, children }) => {
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          bgcolor: "background.paper",
          border: "0.5px solid #000",
          boxShadow: 24,
          p: 1,
          color: "black",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModalComp;
