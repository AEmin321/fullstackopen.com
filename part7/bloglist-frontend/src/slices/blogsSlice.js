import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setLike: (state, action) => {
      return state.map((blog) =>
        blog._id !== action.payload._id ? blog : action.payload
      );
    },
  },
});

export const { setBlogs, appendBlog, setLike } = blogsSlice.actions;
export const updateLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blog = blogs.find((item) => item._id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const res = await blogService.updateLike(id, updatedBlog);
    dispatch(setLike(res));
  };
};
export default blogsSlice.reducer;
