import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getExpiryDate = createAsyncThunk(
    'expired_in',
    async(_,{rejectWithValue})=>{
        try{
            const resp = await api.get('/admin/expiry-date/list');
            // console.log("resp",resp)
            if(resp?.data?.status_code===200){
                
                return resp?.data?.results[0]
            }else{
                return rejectWithValue(resp);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateExpiredIn = createAsyncThunk(
    'updateExpiredIn',
    async({id,userInput},{rejectWithValue})=>{
        try{
            console.log("userInput",userInput)
            const resp = await api.patch(`admin/expiry-date/update/${id}`,userInput);
            if(resp?.data?.status_code===200){
                return resp?.data
            }else{
                return rejectWithValue(resp);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState={
    loading:false,
    error:false,
    expired_in:[],
    updateExpired:{}
}

const ExpiryDateSlice = createSlice(
    {
        name:"expiredIn",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
                .addCase(getExpiryDate.pending,(state)=>{
                    state.loading=true
                })
                .addCase(getExpiryDate.fulfilled,(state,{payload})=>{
                    state.loading=false,
                    state.expired_in = payload
                })
                .addCase(getExpiryDate.rejected,(state,{payload})=>{
                    state.loading=false,
                    state.expired_in = payload
                })
                .addCase(updateExpiredIn.pending,(state)=>{
                    state.loading=true
                })
                .addCase(updateExpiredIn.fulfilled,(state,{payload})=>{
                    state.loading=false,
                    state.updateExpired = payload
                })
                .addCase(updateExpiredIn.rejected,(state,{payload})=>{
                    state.loading=false,
                    state.updateExpired = payload
                })
        }
    }
)
export default ExpiryDateSlice.reducer