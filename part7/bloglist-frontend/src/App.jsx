import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/notification";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  addNotification,
  removeNotification,
} from "./slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "./slices/blogsSlice";
import { logOut, setUser } from "./slices/userSlice";
import Login from "./components/Login";
import RenderBlogs from "./components/RenderBlogs";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));

    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(setUser(user));
      console.log(user);
      blogService.setToken(user.token);
      dispatch(addNotification(`You are now signed in as ${user.username}`));
      setTimeout(() => {
        dispatch(
          removeNotification(`You are now signed in as ${user.username}`)
        );
      }, 5000);
    }
  }, []);

  const user = useSelector((state) => state.user.user);

  return (
    <Router>
      <div>
        <Notification />
        {!user && <Login />}
        {user && (
          <div>
            <p>
              {user.name} is logged in{" "}
              <button onClick={() => dispatch(logOut())}>logout</button>
            </p>
            <Routes>
              <Route path="/users/:id" element={<UserBlogs />} />
              <Route path="/blogs/:id" element={<Blog user={user} />} />
              <Route path="/" element={<RenderBlogs />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
