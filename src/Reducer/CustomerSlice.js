import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getCustomer=createAsyncThunk(
    'getCustomer',
      async ({page,limit}, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/customer/list?page=${page}&limit=${limit}`);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            // let errors = errorHandler(err);
            return rejectWithValue(err);
        }
    }
)

export const getCustomerDetails=createAsyncThunk(
    'getCustomerDetails',
      async (user_input, { rejectWithValue }) => {
console.log("user_input",user_input)

        try {
            const response = await api.get(`/admin/customer/${user_input}`);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            // let errors = errorHandler(err);
            return rejectWithValue(err);
        }
    }
)
const initialState={
    loading:false,
    customerLists:[],
    error:false,
    singleCustomer:{},
    errorSingle:false
}

const CustomerSlice=createSlice(
    {
        name:'cust',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getCustomer.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCustomer.fulfilled,(state,{payload})=>{
                state.loading=false
                state.customerLists=payload
                state.error=false
            })
            .addCase(getCustomer.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getCustomerDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCustomerDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singleCustomer=payload
                state.error=false
            })
            .addCase(getCustomerDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.errorSingle=payload
            })
        }
        
    }
)
export default CustomerSlice.reducer