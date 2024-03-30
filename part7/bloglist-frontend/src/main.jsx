import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import notificationReducer from "./slices/notificationSlice";
import blogsReducer from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
    user: userSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
