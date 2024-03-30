import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { addNotification, removeNotification } from "./notificationSlice";

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
    deleteBlog: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item._id !== id);
    },
    updateComment: (state, action) => {
      return state.map((blog) =>
        blog._id !== action.payload._id ? blog : action.payload
      );
    },
  },
});

export const { setBlogs, appendBlog, setLike, deleteBlog, updateComment } =
  blogsSlice.actions;
export const updateLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blog = blogs.find((item) => item._id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const res = await blogService.updateLike(id, updatedBlog);
    dispatch(setLike(res));
  };
};
export const addComment = (id, comment) => {
  return async (dispatch, getState) => {
    const res = await blogService.addComment(id, comment);
    const blogs = getState().blogs;
    const blog = blogs.find((item) => item._id === id);
    const updatedBlog = { ...blog, comments: [...blog.comments, res] };
    dispatch(updateComment(updatedBlog));
  };
};
export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blog = blogs.find((item) => item._id === id);
    if (window.confirm(`You are about to delete the ${blog.title}.`)) {
      try {
        await blogService.deleteBlog(id);
        dispatch(deleteBlog(id));
        dispatch(addNotification(`${blog.title} deleted successfully`));
        setTimeout(() => {
          dispatch(removeNotification(`${blog.title} deleted successfully`));
        }, 5000);
      } catch (error) {
        dispatch(addNotification("blog already deleted."));
        setTimeout(() => {
          dispatch(removeNotification("blog already deleted."));
        }, 5000);
      }
    }
  };
};
export const addBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const res = await blogService.create(newBlog);
      dispatch(appendBlog(res));
      dispatch(addNotification(`${res.title} Added to the blog list.`));
      setTimeout(() => {
        dispatch(removeNotification(`${res.title} Added to the blog list.`));
      }, 5000);
    } catch (error) {
      dispatch(addNotification("An Error accured."));
      setTimeout(() => {
        dispatch(removeNotification("An Error accured."));
      }, 5000);
    }
  };
};
export default blogsSlice.reducer;
