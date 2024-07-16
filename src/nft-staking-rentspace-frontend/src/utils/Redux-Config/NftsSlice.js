import { createSlice } from "@reduxjs/toolkit";

const NftsSlice = createSlice({
  name: "Nfts",
  initialState: [],
  reducers: {
    addNfts: (state, action) => {
      return action.payload;
    },
    // we can add more actions here if needed
  }
});

export const { addNfts } = NftsSlice.actions;
export default NftsSlice.reducer;
