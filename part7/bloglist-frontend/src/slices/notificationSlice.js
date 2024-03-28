import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { addNotification, clearNotifications, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
