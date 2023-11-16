import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import User from "../../models/User";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";
import styles from "./Login.module.css"; // Import CSS file for styling

interface TaskFormProps {}

const Login: React.FC<TaskFormProps> = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get<User[]>(
      `http://localhost:5000/users?username=${title}`
    );
    if (!data.length) {
      setTitleError("User does not exist");
      return;
    }
    login(data[0]);
  };

  return (
    <div className={styles.background}>
      <Grid container justifyContent="center" className={styles.center}>
        <Paper className={styles.card}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!titleError}
                  helperText={titleError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
