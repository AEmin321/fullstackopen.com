import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      const vari = notification.includes("Error") ? "error" : "success";
      enqueueSnackbar(notification, {
        variant: vari,
      });
    });
  }, [notifications, enqueueSnackbar, dispatch]);

  return null;
};

export default Notification;
