import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getdashBoardData=createAsyncThunk(
    'getdashBoardData',
      async (_, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/dashboard`);
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

export const getdashBoardDataGraph=createAsyncThunk(
    'getdashBoardDataGraph',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`admin/dashboard/vendor-customer-registration-graph`,user_input);
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
   dashData:{},
   error:false,
   graphData:[]
}

const DashboardSliceNew=createSlice(
    {
        name:'das',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getdashBoardData.pending,(state)=>{
                state.loading=true
            })
            .addCase(getdashBoardData.fulfilled,(state,{payload})=>{
                state.loading=false
                state.dashData=payload
                state.error=false
            })
            .addCase(getdashBoardData.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getdashBoardDataGraph.pending,(state)=>{
                state.loading=true
            })
            .addCase(getdashBoardDataGraph.fulfilled,(state,{payload})=>{
                state.loading=false
                state.graphData=payload
                state.error=false
            })
            .addCase(getdashBoardDataGraph.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            
        }
        
    }
)
export default DashboardSliceNew.reducer