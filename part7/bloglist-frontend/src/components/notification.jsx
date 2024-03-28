import { useSelector } from "react-redux";
const Notification = () => {
  const notiStyle = {
    color: "white",
    background: "linear-gradient(225deg, #1cc975 0%, #f1b086 100%)",
    padding: "6px 12px",
    borderRadius: 5,
  };
  const erStyle = {
    color: "white",
    background: "#FF6969",
    padding: "6px 12px",
    borderRadius: 5,
  };

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  console.log(notifications);

  return (
    <div>
      {notifications &&
        notifications.map((item) => (
          <div style={item.includes("Error") ? erStyle : notiStyle} key={item}>
            {item}
          </div>
        ))}
    </div>
  );
};

export default Notification;
