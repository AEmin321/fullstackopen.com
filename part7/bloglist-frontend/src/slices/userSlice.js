import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { addNotification, removeNotification } from "./notificationSlice";
import blogService from "../services/blogs";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, signOut } = userSlice.actions;
export const logIn = (credential) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credential);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(addNotification("Wrong user name or password. try again"));
      setTimeout(() => {
        dispatch(removeNotification("Wrong user name or password. try again"));
      }, 5000);
    }
  };
};
export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(signOut());
  };
};
export default userSlice.reducer;
