import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api"

export const getCoinsLimitDetails = createAsyncThunk(
    'getCoinsLimitDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/vendor/get-coin-usages-limit`);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const setLimitDetails = createAsyncThunk(
    'setLimitDetails',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`/admin/vendor/set-coin-usages-limit`,userInput);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
const initialState={
    loading:false,
    error:false,
    limitCoins:[],
    setCoinLimit:""
}
const CoinSlice=createSlice(
    {
        name:"coins",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getCoinsLimitDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCoinsLimitDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.limitCoins=payload
                state.error=false
            })
               .addCase(getCoinsLimitDetails.rejected,(state,{payload})=>{
                state.loading=false
               
                state.error=payload
            })
            .addCase(setLimitDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(setLimitDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.setCoinLimit=payload
                state.error=false
            })
               .addCase(setLimitDetails.rejected,(state,{payload})=>{
                state.loading=false
               
                state.error=payload
            })

        }
    }
)
export default CoinSlice.reducer; 