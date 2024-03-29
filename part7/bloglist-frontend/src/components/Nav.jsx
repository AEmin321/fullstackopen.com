import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slices/userSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/blogs">Blogs</Link>
      {user && (
        <p>
          {user.name} is logged in{" "}
          <button onClick={() => dispatch(logOut())}>logout</button>
        </p>
      )}
    </div>
  );
};

export default Nav;
