import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Stats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const statsResponse = await axios.get('http://localhost:3000/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersResponse = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(statsResponse.data);
      setUsers(usersResponse.data);
    };
    fetchData();
  }, [token]);

  return (
    <Box>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography>Total Users: {stats.totalUsers}</Typography>
        <Typography>Total Stores: {stats.totalStores}</Typography>
        <Typography>Total Ratings: {stats.totalRatings}</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboard;