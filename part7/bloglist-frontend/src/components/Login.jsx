import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logIn({ username: username, password: password }));
    setUserName("");
    setPassword("");
    navigate("/");
  };
  return (
    <Container
      sx={{
        height: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            margin="dense"
            id="standard-basic"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
            label="Username"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="standard-basic"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            variant="standard"
          />
        </Box>
        <Box sx={{ my: "1rem" }}>
          <Button type="submit" variant="contained" disableElevation fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
