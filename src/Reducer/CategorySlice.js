import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const getAllCategory=createAsyncThunk(
    'getAllCategory',
      async ({page,limit}, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/category-manage/list?page=${page}&limit=${limit}`);
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

export const getCategoryDetails=createAsyncThunk(
    'getCategoryDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.get(`/admin/category-manage/detail/${user_input}`);
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

export const updateCategoryDetails=createAsyncThunk(
    'updateCategoryDetails',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.put(`/admin/category-manage/edit`,user_input);
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

export const categoryActiveDeactive=createAsyncThunk(
    'categoryActiveDeactive',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.patch(`admin/category-manage/activation`,user_input);
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

export const updateBanner=createAsyncThunk(
    'updateBanner',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.patch(`admin/category-manage/change-banner`,user_input);
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

export const addCategory=createAsyncThunk(
    'addCategory',
      async (user_input, { rejectWithValue }) => {

        try {
            const response = await api.post(`/admin/category-manage/add`,user_input);
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
    categoryList:[],
    error:false,
    singleCategory:{},
    errorSingle:false,
    updateCateData:{},
    delCust:{},
    plans:[],
    addCateData:"",
    imageData:""
}

const CategorySlice=createSlice(
    {
        name:'cateMan',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getAllCategory.pending,(state)=>{
                state.loading=true
            })
            .addCase(getAllCategory.fulfilled,(state,{payload})=>{
                state.loading=false
                state.categoryList=payload
                state.error=false
            })
            .addCase(getAllCategory.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getCategoryDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCategoryDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singleCategory=payload
                state.error=false
            })
            .addCase(getCategoryDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.errorSingle=payload
            })
            .addCase(updateCategoryDetails.pending,(state)=>{
                state.loading=true
            })
            .addCase(updateCategoryDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.updateCateData=payload
                state.error=false
            })
            .addCase(updateCategoryDetails.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(updateBanner.pending,(state)=>{
                state.loading=true
            })
            .addCase(updateBanner.fulfilled,(state,{payload})=>{
                state.loading=false
                state.imageData=payload
                state.error=false
            })
            .addCase(updateBanner.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(addCategory.pending,(state)=>{
                state.loading=true
            })
            .addCase(addCategory.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addCateData=payload
                state.error=false
            })
            .addCase(addCategory.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
        
    }
)
export default CategorySlice.reducer