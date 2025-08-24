import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getAllPlans=createAsyncThunk(
    'getAllPlans',
      async ({page,limit}, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/plan-mange/list?page=${page}&limit=${limit}`);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            // let errors = errorHandler(err);
            console.log(rejectWithValue(err));
        }
    }
)

export const getPlansDetails=createAsyncThunk(
    'getPlansDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/plan-mange/details/${user_input}`);
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

export const updatePlanDetails=createAsyncThunk(
    'updatePlanDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.put(`/admin/plan-mange/edit`,user_input);
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



export const planActiveDeactive=createAsyncThunk(
    'planActiveDeactive',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.patch(`admin/plan-mange/activation`,user_input);
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

export const getPlans=createAsyncThunk(
    'getPlans',
      async (_, { rejectWithValue }) => {

        try {
            const response = await api.get(`admin/plan-badge-mange/plan-dropdown`);
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

export const addPlans=createAsyncThunk(
    'addPlans',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/plan-mange/add`,user_input);
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




const initialState={
    loading:false,
    planList:[],
    error:false,
    singlePlan:{},
    errorSingle:false,
    updatePlanData:{},
    delCust:{},
    plans:[],
    addPlanData:"",
}

const PlanManagementSlice=createSlice(
    {
        name:'planMan',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getAllPlans.pending,(state)=>{
                state.loading=true
            })
            .addCase(getAllPlans.fulfilled,(state,{payload})=>{
                state.loading=false
                state.planList=payload
                state.error=false
            })
            .addCase(getAllPlans.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getPlansDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getPlansDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singlePlan=payload
                state.error=false
            })
            .addCase(getPlansDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.errorSingle=payload
            })
            .addCase(updatePlanDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(updatePlanDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.updatePlanData=payload
                state.error=false
            })
            .addCase(updatePlanDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getPlans.pending,(state)=>{
                state.loading=true
            })
            .addCase(getPlans.fulfilled,(state,{payload})=>{
                state.loading=false
                state.plans=payload
                state.error=false
            })
            .addCase(getPlans.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(addPlans.pending,(state)=>{
                state.loading=true
            })
            .addCase(addPlans.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addPlanData=payload
                state.error=false
            })
            .addCase(addPlans.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
        
    }
)
export default PlanManagementSlice.reducer