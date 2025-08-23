import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getPlanBadge=createAsyncThunk(
    'getPlanBadge',
      async ({page,limit}, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/plan-badge-mange/list?page=${page}&limit=${limit}`);
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

export const getPlanBatchDetails=createAsyncThunk(
    'getPlanBatchDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/plan-badge-mange/detail/${user_input}`);
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

export const updatePlanBadgeDetails=createAsyncThunk(
    'updatePlanBadgeDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.put(`/admin/plan-badge-mange/edit`,user_input);
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

// export const deleteCustomerDetails=createAsyncThunk(
//     'deleteCustomerDetails',
//       async (user_input, { rejectWithValue }) => {

//         try {
//             const response = await api.delete(`/admin/customer/delete-customer`,{data:user_input});
//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response.data);
//             }
//         } catch (err) {
//             // let errors = errorHandler(err);
//             return rejectWithValue(err);
//         }
//     }
// )


export const planBadgeActiveDeactive=createAsyncThunk(
    'customerActiveDeactive',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.patch(`admin/plan-badge-mange/activation`,user_input);
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

export const addPlanBadge=createAsyncThunk(
    'addPlanBadge',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/plan-badge-mange/add`,user_input);
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
    planBadgeList:[],
    error:false,
    singlePlanbdge:{},
    errorSingle:false,
    updatePlanBadgeData:{},
    delCust:{},
    plans:[],
    addBadgeData:"",
}

const PlanbadgeSlice=createSlice(
    {
        name:'planBad',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getPlanBadge.pending,(state)=>{
                state.loading=true
            })
            .addCase(getPlanBadge.fulfilled,(state,{payload})=>{
                state.loading=false
                state.planBadgeList=payload
                state.error=false
            })
            .addCase(getPlanBadge.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getPlanBatchDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getPlanBatchDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singlePlanbdge=payload
                state.error=false
            })
            .addCase(getPlanBatchDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.errorSingle=payload
            })
            .addCase(updatePlanBadgeDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(updatePlanBadgeDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.updateCusteData=payload
                state.error=false
            })
            .addCase(updatePlanBadgeDetails.rejected,(state,{payload})=>{
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
            .addCase(addPlanBadge.pending,(state)=>{
                state.loading=true
            })
            .addCase(addPlanBadge.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addBadgeData=payload
                state.error=false
            })
            .addCase(addPlanBadge.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
        
    }
)
export default PlanbadgeSlice.reducer