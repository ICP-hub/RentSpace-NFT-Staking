import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NftsSlice from "./NftsSlice";

export const myStore = configureStore({
    reducer:{
      user:UserSlice,
      Nfts:NftsSlice
    }
})