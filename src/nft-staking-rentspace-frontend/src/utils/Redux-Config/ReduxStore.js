import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NftsSlice from "./NftsSlice";
import ImportNfts_Slice from "./ImportNfts_Slice";

export const myStore = configureStore({
    reducer:{
      user:UserSlice,
      Nfts:NftsSlice,
      ImportNfts:ImportNfts_Slice,
    }
})