import { createSlice } from "@reduxjs/toolkit";

const ImportNfts_Slice = createSlice({
  name: "ImportNfts",
  initialState: [],
  reducers: {
    add_ImportNfts: (state, action) => {
      state.push(action.payload);
    },
    // we can add more actions here if needed
  }
});

export const { add_ImportNfts } = ImportNfts_Slice.actions;
export default ImportNfts_Slice.reducer;
