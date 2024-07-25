import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:"user",
    initialState:{},
    reducers:{
        addUserData:(state, action)=>{
             return action.payload;
        },
        removeUserData:(state, action)=>{
            return {};
       },
       addPoints:(state, action)=>{
         const points = parseInt(state.rewardPoints);
         return {...state, rewardPoints: points + parseInt(action.payload)};
       },
       updatePoints:(state, action) =>{
            return {...state, rewardPoints: action.payload};
       }
    }
})

export const {addUserData,removeUserData, addPoints, updatePoints} = UserSlice.actions;
export default UserSlice.reducer;