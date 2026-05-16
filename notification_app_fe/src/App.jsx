import { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notificationApi";
import { getTopNotifications } from "./utils/priorityManager";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const data = await fetchNotifications();

      if (!data || data.length === 0) {
        return;
      }

      const topNotifications = getTopNotifications(data);

      setNotifications(topNotifications);
    }

    loadNotifications();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Top Priority Notifications</h1>

      <p>Total Notifications: {notifications.length}</p>

      {notifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <small>{notification.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;