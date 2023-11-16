import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import User from "../../models/User";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "axios";

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
      setTitleError("User not exist");
      return;
    }
    login(data[0]);
  };
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs />
        <Paper elevation={3} style={{ padding: "1rem" }}>
          <form onSubmit={handleSubmit}>
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
          </form>
        </Paper>
        <Grid item xs />
      </Grid>
    </>
  );
};

export default Login;
