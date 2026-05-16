import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={3} sx={{ zIndex: 10 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="h5" component="span" role="img" aria-label="notification">
              🔔
            </Typography>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              Campus Notification System
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
