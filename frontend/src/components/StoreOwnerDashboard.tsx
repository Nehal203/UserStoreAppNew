import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Rating {
  userId: number;
  rating: number;
}

const StoreOwnerDashboard: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stores/my-ratings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRatings(response.data.ratings);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Failed to fetch ratings', error);
      }
    };
    fetchRatings();
  }, [token]);

  return (
    <Box>
      <Typography variant="h4">Store Owner Dashboard</Typography>
      <Typography>Average Rating: {averageRating.toFixed(1)}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((rating, index) => (
            <TableRow key={index}>
              <TableCell>{rating.userId}</TableCell>
              <TableCell>{rating.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StoreOwnerDashboard;