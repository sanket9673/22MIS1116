import { Tabs, Tab, Box, Paper } from "@mui/material";

export default function FilterBar({ filter, onFilterChange }) {
  const handleChange = (event, newValue) => {
    onFilterChange(newValue);
  };

  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Tabs 
          value={filter} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="notification filters"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All" value="All" sx={{ fontWeight: 600 }} />
          <Tab label="Placement" value="Placement" sx={{ fontWeight: 600 }} />
          <Tab label="Result" value="Result" sx={{ fontWeight: 600 }} />
          <Tab label="Event" value="Event" sx={{ fontWeight: 600 }} />
        </Tabs>
      </Box>
    </Paper>
  );
}
