import { Pagination, Box } from "@mui/material";

export default function PaginationBar({ count, page, onChange }) {
  if (count <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={6}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={(e, val) => onChange(val)} 
        color="primary" 
        size="large"
        shape="rounded"
        showFirstButton 
        showLastButton
      />
    </Box>
  );
}
