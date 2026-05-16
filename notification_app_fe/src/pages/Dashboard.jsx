import { useState, useEffect, useMemo } from "react";
import { Container, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchNotifications } from "../api/notificationApi";
import { getTopNotifications } from "../utils/priorityManager";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import TopNotifications from "../components/TopNotifications";
import NotificationList from "../components/NotificationList";
import PaginationBar from "../components/PaginationBar";

export default function Dashboard() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewedState, setViewedState] = useState({});

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        if (isMounted) {
          setAllNotifications(data || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load notifications. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset page on filter change
  };

  const handleNotificationClick = (id) => {
    setViewedState(prev => ({ ...prev, [id]: true }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Extract top priority notifications
  const topNotifications = useMemo(() => {
    if (!allNotifications.length) return [];
    // getTopNotifications might mutate, passing a shallow copy
    return getTopNotifications([...allNotifications]).slice(0, 3);
  }, [allNotifications]);

  // Filter regular notifications
  const filteredNotifications = useMemo(() => {
    let filtered = [...allNotifications];
    
    // We remove the top 3 notifications from the list so they don't duplicate
    const topIds = new Set(topNotifications.map(n => n.ID));
    filtered = filtered.filter(n => !topIds.has(n.ID));

    if (filter !== "All") {
      filtered = filtered.filter(n => n.Type === filter);
    }
    
    // Sort remaining by latest timestamp
    return filtered.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());
  }, [allNotifications, filter, topNotifications]);

  // Pagination
  const paginatedNotifications = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotifications, page]);

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>
        ) : (
          <>
            <TopNotifications 
              notifications={topNotifications} 
              viewedState={viewedState} 
              onNotificationClick={handleNotificationClick} 
            />

            <Box mt={6} mb={3}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                All Notifications
              </Typography>
            </Box>

            <FilterBar filter={filter} onFilterChange={handleFilterChange} />
            
            <NotificationList 
              notifications={paginatedNotifications} 
              viewedState={viewedState} 
              onNotificationClick={handleNotificationClick} 
            />

            <PaginationBar 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
            />
          </>
        )}
      </Container>
    </Box>
  );
}
