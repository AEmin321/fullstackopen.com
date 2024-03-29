import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="Username">Username:</label>
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUserName(target.value)}
        />
        <br />
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
