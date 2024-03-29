import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { updateLike, removeBlog } from "../slices/blogsSlice";

const RenderBlogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
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
};

export default RenderBlogs;
