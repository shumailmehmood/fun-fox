import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Modal from "../Modal/Modal";
import TaskForm from "../TaskForm/Taskform";
import Task from "../../models/Task";
import { PlusIcon } from "../../assets/icons";
import styles from "./ListHeader.module.css";

interface listHeaderProps {
  addTask: (newTask: Task) => void;
}
const TaskCard: React.FC<listHeaderProps> = ({ addTask }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <Card className={`${styles.top} ${styles.stickyCard}`}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5">Tasks</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleModalOpen}>
              <PlusIcon />
            </Button>
            <Modal openModel={open} handleClose={handleModalClose}>
              <TaskForm addTask={addTask} />
            </Modal>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
