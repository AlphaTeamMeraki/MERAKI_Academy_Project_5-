import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/SidebarOwner';
import { Outlet } from 'react-router-dom';

const Owner = () => {
 

  return (
    <Box sx={{ display: 'flex', background:"#d0d3d8" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Owner;
