import { createSlice } from '@reduxjs/toolkit';

export const watchList = createSlice({
    name:"watchlist",
    initialState:{
        value:[],
    },
    reducers:{
        addWatchlist:(state,action)=>{
            let newdata:any = [...state.value,action.payload];

            state.value = newdata;
        },
    }
})

export const { addWatchlist } = watchList.actions;

export default watchList.reducer