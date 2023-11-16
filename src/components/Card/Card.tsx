import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import styles from "./Card.module.css";

interface CustomCardProps {
  name: string;
  description: string;
  status: boolean;
  date: Date;
  onToggleStatus: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  taskId: number;
}

const CustomCard: React.FC<CustomCardProps> = ({
  name,
  description,
  status,
  date,
  onToggleStatus,
  onDelete,
  taskId,
}) => {
  const [openConfirmComplete, setOpenConfirmComplete] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmComplete = () => {
    onToggleStatus(taskId);
    setOpenConfirmComplete(false);
  };

  const handleConfirmDelete = () => {
    onDelete(taskId);
    setOpenConfirmDelete(false);
  };

  const getStatusColor = () => {
    return status ? "green" : "red";
  };

  return (
    <Card sx={{ my: "1rem", width: "100%" }} className={styles.cardContainer}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton disabled>
              <Avatar
                sx={{
                  bgcolor: getStatusColor(),
                  width: 24,
                  height: 24,
                  marginRight: 1,
                }}
              >
                {status ? "✓" : "✗"}
              </Avatar>
              <Typography variant="body2" gutterBottom>
                {status ? "Completed" : "Uncomplete"}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => setOpenConfirmComplete(true)}
              disabled={status}
            />

            <Dialog
              open={openConfirmComplete}
              onClose={() => setOpenConfirmComplete(false)}
            >
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to mark this task as completed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmComplete(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmComplete}
                  variant="contained"
                  color="success"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item>
            <IconButton disabled>
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="body2" component="span">
              {date.toLocaleDateString()}
            </Typography>
            <IconButton onClick={() => setOpenConfirmDelete(true)}>
              <DeleteIcon sx={{ color: red[900] }} />
            </IconButton>
            <Dialog
              open={openConfirmDelete}
              onClose={() => setOpenConfirmDelete(false)}
            >
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this task?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmDelete(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
