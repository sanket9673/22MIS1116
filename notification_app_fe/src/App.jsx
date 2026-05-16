import { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notificationApi";
import { getTopNotifications } from "./utils/priorityManager";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const data = await fetchNotifications();

      const topNotifications =
        getTopNotifications(
          data.notifications || []
        );

      setNotifications(topNotifications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        Loading notifications...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Priority Notifications</h1>

      {notifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <small>
            {notification.Timestamp}
          </small>
        </div>
      ))}
    </div>
  );
}

export default App;