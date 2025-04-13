import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Store {
  id: number;
  name: string;
  address: string;
  rating: number;
  userRating?: number;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState({ name: '', address: '' });
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    const response = await axios.get('http://localhost:3000/stores', {
      headers: { Authorization: `Bearer ${token}` },
      params: search,
    });
    setStores(response.data);
  };

  const handleRate = async (storeId: number, rating: number) => {
    await axios.post(
      'http://localhost:3000/ratings',
      { storeId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchStores();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by Name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <TextField
          label="Search by Address"
          value={search.address}
          onChange={(e) => setSearch({ ...search, address: e.target.value })}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Your Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.rating}</TableCell>
              <TableCell>{store.userRating || 'Not rated'}</TableCell>
              <TableCell>
                {[1, 2, 3, 4, 5].map((r) => (
                  <Button key={r} onClick={() => handleRate(store.id, r)}>
                    {r}
                  </Button>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StoreList;