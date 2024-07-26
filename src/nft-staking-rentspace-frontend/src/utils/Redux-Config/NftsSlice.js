import { createSlice } from "@reduxjs/toolkit";

const NftsSlice = createSlice({
  name: "Nfts",
  initialState: {
    importedNFTs: [],
    stakedNFTs: []
  },
  reducers: {
    addImportedNFTs: (state, action) => {
      state.importedNFTs = action.payload;
    },
    addStakedNFTs: (state, action) => {
      state.stakedNFTs = action.payload;
    },

    appendStakedNFTs: (state, action) => {
      state.stakedNFTs.push(action.payload);
    },
    appendImportedNFTs: (state, action) => {
      state.importedNFTs.push(action.payload);
    },
    removeStakedNFTs: (state, action) => {
      const id = action.payload;
      state.stakedNFTs = state.stakedNFTs.filter(nft => nft.id !== id);
    },
    modifyImportedNFTs: (state, action) => {
      const  id  = action.payload;
      state.importedNFTs = state.importedNFTs.map(nft =>
        nft.id === id ? { ...nft, isStaked: true } : nft
      );
    },
    modifyStakedNFTs: (state, action) => {
      const  id  = action.payload;
      state.stakedNFTs = state.stakedNFTs.map(nft =>
        nft.id === id ? { ...nft, isStaked: false } : nft
      );
    }
    // we can add more actions here if needed
  }
});

export const { addImportedNFTs, addStakedNFTs, modifyImportedNFTs, modifyStakedNFTs, appendStakedNFTs, removeStakedNFTs, appendImportedNFTs } = NftsSlice.actions;

export default NftsSlice.reducer;
