import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getMarchent=createAsyncThunk(
    'getMarchent',
         async (_, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/vendor/get-vendors`);
            console.log("response",response);
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

export const getMarchentDetails=createAsyncThunk(
    'getMarchentDetails',
         async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/vendor/get-vendors`,user_input);
            console.log("response",response);
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

export const addMarchent=createAsyncThunk(
'addMarchent',
          async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/vendor/add-vendor`,user_input);
            console.log("response",response);
            if (response?.data?.status_code === 201) {
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

export const updateMarchent=createAsyncThunk(
'updateMarchent',
          async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/vendor/update-vendor`,user_input);
            console.log("response",response);
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

export const suspendMarchent=createAsyncThunk(
'suspendMarchent',
          async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/vendor/suspend-account`,user_input);
            console.log("response",response);
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
    error:false,
    marchentList:[],
    singleMarchent:{},
    addVendorData:{},
    updateMarchentData:{},
    delmarchentData:{}
}
const MarchentSlice=createSlice(
    {
        name:'marc',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getMarchent.pending,(state)=>{
                state.loading=true
            })
            .addCase(getMarchent.fulfilled,(state,{payload})=>{
                state.loading=false
                state.marchentList=payload
                state.error=false
            })
            .addCase(getMarchent.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getMarchentDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getMarchentDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singleMarchent=payload
                state.error=false
            })
             .addCase(getMarchentDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(addMarchent.pending,(state)=>{
                state.loading=true
            }).addCase(addMarchent.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addVendorData=payload
                state.error=false
            })
            .addCase(addMarchent.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(updateMarchent.pending,(state)=>{
                state.loading=true
            }).addCase(updateMarchent.fulfilled,(state,{payload})=>{
                state.loading=false
                state.updateMarchentData=payload
                state.error=false
            })
            .addCase(updateMarchent.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(suspendMarchent.pending,(state)=>{
                state.loading=true
            })
            .addCase(suspendMarchent.fulfilled,(state,{payload})=>{
                state.loading=false
                state.delmarchentData=payload
                state.error=false
            })
            .addCase(suspendMarchent.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default MarchentSlice.reducer;