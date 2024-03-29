import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { updateLike, removeBlog } from "../slices/blogsSlice";
import CreateBlog from "./CreateBlog";
import { Link } from "react-router-dom";

const RenderBlogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div>
      <CreateBlog />
      <h2>Blogs</h2>
      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <h3 key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>
                {blog.title}- {blog.author}
              </Link>
            </h3>
          ))}
    </div>
  );
};

export default RenderBlogs;
