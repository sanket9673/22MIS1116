import { useEffect, useState } from "react";

import { fetchNotifications } from "./api/notificationApi";

import { getTopNotifications } from "./utils/priorityManager";

import { Log } from "./utils/logger";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    await Log(
      "frontend",
      "info",
      "page",
      "Loading notifications"
    );

    const data = await fetchNotifications();

    const topNotifications =
      await getTopNotifications(data);

    setNotifications(topNotifications);

    await Log(
      "frontend",
      "info",
      "state",
      "Top notifications state updated"
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Priority Notifications</h1>

      {notifications.map((item) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;