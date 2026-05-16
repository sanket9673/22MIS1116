import { Box, Typography, Stack, Paper } from "@mui/material";
import NotificationCard from "./NotificationCard";

export default function NotificationList({ notifications, viewedState, onNotificationClick }) {
  if (!notifications || notifications.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 5, textAlign: "center", bgcolor: 'transparent', border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No notifications found for the selected filter.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={0}>
      {notifications.map(notif => (
        <NotificationCard 
          key={`list-${notif.ID}`}
          notification={notif}
          isViewed={!!viewedState[notif.ID]}
          onClick={onNotificationClick}
        />
      ))}
    </Stack>
  );
}
