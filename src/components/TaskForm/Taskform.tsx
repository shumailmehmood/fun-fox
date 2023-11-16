import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Snackbar } from "@mui/material";
import Task from "../../models/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
    } else {
      setTitleError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Description cannot be empty");
    } else {
      setDescriptionError("");
    }

    if (title.trim() !== "" && description.trim() !== "") {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000),
        title,
        description,
        completed: false,
        groupId: 0,
        lastUpdated: new Date().toLocaleString(),
      };
      addTask(newTask);
      setTitle("");
      setDescription("");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!titleError}
              helperText={titleError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!descriptionError}
              helperText={descriptionError}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          <div style={{ display: "flex", alignItems: "center" }}>
            <CheckCircleIcon style={{ marginRight: "0.5rem" }} />
            Data saved successfully
          </div>
        }
      />
    </Paper>
  );
};

export default TaskForm;
