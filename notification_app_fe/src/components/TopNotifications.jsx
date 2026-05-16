import { Box, Typography, Grid } from "@mui/material";
import NotificationCard from "./NotificationCard";

export default function TopNotifications({ notifications, viewedState, onNotificationClick }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <Box mb={5} mt={3}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary', mb: 3 }}>
        <span role="img" aria-label="fire">🔥</span> Top Priority Notifications
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {notifications.map(notif => (
          <Grid item xs={12} sm={6} md={4} key={`top-${notif.ID}`}>
            <NotificationCard 
              notification={notif}
              isViewed={!!viewedState[notif.ID]}
              onClick={onNotificationClick}
              isTopPriority={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
