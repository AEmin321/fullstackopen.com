import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateLike } from "../slices/blogsSlice";
import { useParams } from "react-router-dom";

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;

  const blog = blogs.find((item) => item._id === id);
  if (!blog) {
    return null;
  }

  return (
    <div className="blogCard">
      <div className="defaultBlog">
        <h1>
          {blog.title} - {blog.author}
        </h1>
        <div>{blog.url}</div>
        <div>
          {blog.likes}{" "}
          <button onClick={() => dispatch(updateLike(id))}>like</button>
        </div>
        <div>{blog.author}</div>
        {user.name === blog.author ? (
          <button id="remove-btn" onClick={() => dispatch(removeBlog(id))}>
            Remove
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
