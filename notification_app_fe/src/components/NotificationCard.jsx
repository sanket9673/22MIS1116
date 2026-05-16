import { Card, CardContent, Typography, Chip, Box, CardActionArea } from "@mui/material";

export default function NotificationCard({ notification, isViewed, onClick, isTopPriority = false }) {
  const getChipColor = (type) => {
    switch (type) {
      case "Placement":
        return "error";
      case "Result":
        return "warning";
      case "Event":
        return "info";
      default:
        return "default";
    }
  };

  const formattedDate = new Date(notification.Timestamp).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', 
    hour: '2-digit', minute: '2-digit'
  });

  const bgColor = isViewed ? 'background.paper' : (isTopPriority ? '#fff8e1' : '#f0f4f8');
  const borderColor = isViewed ? 'transparent' : (isTopPriority ? 'warning.main' : 'primary.main');
  const borderWidth = isViewed ? 1 : 2;

  return (
    <Card 
      sx={{ 
        mb: 2, 
        transition: 'all 0.2s ease-in-out',
        opacity: isViewed ? 0.65 : 1,
        border: `${borderWidth}px solid`,
        borderColor: borderColor,
        backgroundColor: bgColor,
        boxShadow: isViewed ? 1 : (isTopPriority ? 4 : 2),
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)'
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2
      }}
    >
      <CardActionArea 
        onClick={() => onClick(notification.ID)} 
        sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <CardContent sx={{ p: 0, width: '100%', '&:last-child': { pb: 0 } }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Chip 
              label={notification.Type} 
              color={getChipColor(notification.Type)} 
              size="small" 
              sx={{ fontWeight: 600, px: 0.5 }} 
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {formattedDate}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: isViewed ? 400 : 600, color: 'text.primary', mb: 1, lineHeight: 1.5 }}>
            {notification.Message}
          </Typography>
          {isTopPriority && !isViewed && (
             <Typography variant="caption" color="warning.dark" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', mt: 1 }}>
               ⭐ Top Priority
             </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
