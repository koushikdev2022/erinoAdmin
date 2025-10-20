import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getSubscription=createAsyncThunk(
    'getSubscription',
      async ({page,limit}, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/subscription-token-manage/list?page=${page}&limit=${limit}`);
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

export const getSubscriptionDetails=createAsyncThunk(
    'getSubscriptionDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/subscription-token-manage/details/${user_input}`);
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

export const updateSubsDetails=createAsyncThunk(
    'updateSubsDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.put(`/admin/subscription-token-manage/edit`,user_input);
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
    'planBadgeActiveDeactive',
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

export const addSubscriptionToken=createAsyncThunk(
    'addSubscriptionToken',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/subscription-token-manage/add`,user_input);
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
    subscriptionList:[],
    error:false,
    singleSubs:{},
    errorSingle:false,
    updateSubsData:{},
    delCust:{},
    plans:[],
    addSubscriptionTokenData:"",
}

const SubscriptionSlice=createSlice(
    {
        name:'subs',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getSubscription.pending,(state)=>{
                state.loading=true
            })
            .addCase(getSubscription.fulfilled,(state,{payload})=>{
                state.loading=false
                state.subscriptionList=payload
                state.error=false
            })
            .addCase(getSubscription.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getSubscriptionDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getSubscriptionDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singleSubs=payload
                state.error=false
            })
            .addCase(getSubscriptionDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.errorSingle=payload
            })
            .addCase(updateSubsDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(updateSubsDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.updateSubsData=payload
                state.error=false
            })
            .addCase(updateSubsDetails.rejected,(state,{payload})=>{
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
            .addCase(addSubscriptionToken.pending,(state)=>{
                state.loading=true
            })
            .addCase(addSubscriptionToken.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addSubscriptionTokenData=payload
                state.error=false
            })
            .addCase(addSubscriptionToken.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
        
    }
)
export default SubscriptionSlice.reducer