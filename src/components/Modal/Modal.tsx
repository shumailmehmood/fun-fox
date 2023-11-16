import React from "react";
import { Box, Modal } from "@mui/material";

interface AddTaskModalProps {
  handleClose: () => void;
  children: React.ReactNode;
  openModel: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  handleClose,
  children,
  openModel,
}) => {
  return (
    <Modal open={openModel} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
