import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../slices/blogsSlice";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addToBlog = (event) => {
    event.preventDefault();
    dispatch(addBlog({ title: title, author: author, url: url }));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addToBlog}>
        <h2>Create new Blog</h2>
        <div>
          <label htmlFor="Title">
            Title:
            <input
              placeholder="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Author">
            Author:
            <input
              placeholder="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Url">
            URL:
            <input
              placeholder="url"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
