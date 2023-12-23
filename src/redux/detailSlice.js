import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosClient from '../helpers/axios.helper';

export const ratingProductAction = createAsyncThunk(
    'detail/createRate',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8000/homestays/rate/${params.id}`, params);
            console.log(params)
            console.log(response.data)
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
export const getRatingAction = createAsyncThunk(
    'detail/getRate',
    async ({ userId, id }, { rejectWithValue }) => {
        try {
            console.log({ userId, id });
            const response = await axios.get(`http://localhost:8000/homestays/getUserRate/${userId}/${id}`);
            
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
export const getCommentAction = createAsyncThunk(
    'detail/getComment',
    async (params, { rejectWithValue }) => {
        try {
            console.log(params);
            const response = await axios.post(`http://localhost:8000/homestays/getcomment`,params);
            
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
export const CommentAction = createAsyncThunk(
    'detail/Comment',
    async (params, { rejectWithValue }) => {
        try {
            console.log(params);
            const response = await axiosClient.post(`http://localhost:8000/homestays/comment`,params);
            
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);

const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        rate: [],
        comments:[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(ratingProductAction.pending, (state) => {

            })
            .addCase(ratingProductAction.fulfilled, (state, action) => {
                state.rate = action.payload.content
            })
            .addCase(ratingProductAction.rejected, (state, action) => {
                toast.error(action.payload.message);
            })
            .addCase(getRatingAction.pending, (state) => {

            })
            .addCase(getRatingAction.fulfilled, (state, action) => {
                state.rate = action.payload.content
            })
            .addCase(getRatingAction.rejected, (state, action) => {
                toast.error(action.payload.message);
            })
            .addCase(getCommentAction.pending, (state) => {

            })
            .addCase(getCommentAction.fulfilled, (state, action) => {
                state.comments = action.payload.content
            })
            .addCase(getCommentAction.rejected, (state, action) => {
                toast.error(action.payload.message);
            })
            .addCase(CommentAction.pending, (state) => {

            })
            .addCase(CommentAction.fulfilled, (state, action) => {
                state.comments = action.payload.content
            })
            .addCase(CommentAction.rejected, (state, action) => {
                toast.error(action.payload.message);
            })
    },
}
)
export const selectDetail = (state) => state.detail.rate;
export const selectComment = (state) => state.detail.comments;

export default detailSlice.reducer;