import { createSlice } from '@reduxjs/toolkit';

interface StoreState {
  stores: { id: number; name: string; address: string; rating: number }[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStores(state, action) {
      state.stores = action.payload;
    },
  },
});

export const { setStores } = storeSlice.actions;
export default storeSlice.reducer;