import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";
import BlogForm from "./components/BlogForm";
import Toggle from "./components/Toggle";
import {
  addNotification,
  removeNotification,
} from "./slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, updateLike, removeBlog, addBlog } from "./slices/blogsSlice";
import { logIn, logOut, setUser } from "./slices/userSlice";

const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.user);

  const handleCreateBlog = (newBlog) => {
    dispatch(addBlog(newBlog));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logIn({ username: username, password: password }));
    setUserName("");
    setPassword("");
  };

  const login = () => (
    <div>
      <h2>login to application</h2>
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

  const renderBlogs = () => (
    <div>
      <h2>Blogs</h2>
      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              handleLike={() => dispatch(updateLike(blog._id))}
              user={user}
              handleDelete={() => dispatch(removeBlog(blog._id))}
            />
          ))}
    </div>
  );

  const createBlog = () => (
    <Toggle buttonText="Create New Blog">
      <BlogForm createBlog={handleCreateBlog} />
    </Toggle>
  );

  return (
    <div>
      <Notification />
      {!user && login()}
      {user && (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={() => dispatch(logOut())}>logout</button>
          </p>
          <div>{createBlog()}</div>
          {renderBlogs()}{" "}
        </div>
      )}
    </div>
  );
};

export default App;
