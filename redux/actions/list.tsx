import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
    name:"list",
    initialState:{
        value:[],
    },
    reducers:{
        add:(state,action)=>{
            let newdata:any = [...state.value,action.payload];

            state.value = newdata;
        },
        ordering:(state,action)=>{
            state.value = action.payload;
        },
        remove:(state,action)=>{
            const updated = state.value.filter((v:any)=>{
                return v.symbol+":"+v.exchange != action.payload.symbol+":"+action.payload.exchange
            })

            state.value = updated;
        }
    }
})

export const { add,remove,ordering } = listSlice.actions;

export default listSlice.reducer