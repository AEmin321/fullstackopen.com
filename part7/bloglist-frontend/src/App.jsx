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
import {
  setBlogs,
  appendBlog,
  updateLike,
  removeBlog,
  addBlog,
} from "./slices/blogsSlice";

const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));

    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
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

  const handleCreateBlog = (newBlog) => {
    dispatch(addBlog(newBlog));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUserName("");
      setPassword("");
      setUser(user);
    } catch (error) {
      dispatch(addNotification("Wrong user name or password. try again"));
      setTimeout(() => {
        dispatch(removeNotification("Wrong user name or password. try again"));
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
            <button onClick={handleLogout}>logout</button>
          </p>
          <div>{createBlog()}</div>
          {renderBlogs()}{" "}
        </div>
      )}
    </div>
  );
};

export default App;
