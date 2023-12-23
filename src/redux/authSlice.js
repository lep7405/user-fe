import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosClient from '../helpers/axios.helper';

export const registerAction = createAsyncThunk(
    'authen/register',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8000/users/create/user`, params);
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
export const loginAction = createAsyncThunk(
    'authen/login',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8000/auth/login`, params);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
export const getMeAction = createAsyncThunk(
    'authen/getMe',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`http://localhost:8000/users/get/user`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
export const logOutAction = createAsyncThunk(
    'authen/logout',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`http://localhost:8000/auth/logout`, params);
            console.log(response)
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.response || error
            );
        }
    }
);
const authenSlice = createSlice({
    name: 'authen',
    initialState: {
        userData: {
            email: null,
            userId: null,
            name: null,
        },
        accessToken: null,
        isLogin: false,
        verifyUserStatus: 200,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {

            })
            .addCase(registerAction.fulfilled, (state, action) => {

            })
            .addCase(registerAction.rejected, (state, action) => {
                toast.error(action.payload.message);
            })
            .addCase(loginAction.pending, (state) => {
                state.isLogin = false;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.isLogin = true;
                state.accessToken = action.payload.content.token;
                state.userData.email = action.payload.content.email;
                state.userData.userId = action.payload.content._id;
                state.userData.name = action.payload.content.name;
                localStorage.setItem('AccessToken', action.payload.content.token);
                localStorage.setItem('UserId', action.payload.content._id);
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.isLogin = false;
                toast.error(action.payload.message || 'Wrong email or password');
            })
            .addCase(logOutAction.pending, (state) => {

            })
            .addCase(logOutAction.fulfilled, (state, action) => {
                state.isLogin = false;
                state.userData.email = null;
                state.userData.userId = null;
                localStorage.removeItem('AccessToken');
                localStorage.removeItem('UserId');
            })
            .addCase(logOutAction.rejected, (state, action) => {

            })
            .addCase(getMeAction.pending, (state) => {


            })
            .addCase(getMeAction.fulfilled, (state, action) => {
                state.isLogin = true;
                state.userData.email = action.payload.user.email;
                state.userData.userId = action.payload.user._id;
                state.userData.name = action.payload.user.name;
            })
            .addCase(getMeAction.rejected, (state, action) => {


            })
    },
}
)
export const selectUserData = (state) => state.authen.userData;
export const selectIsLogin = (state) => state.authen.isLogin;

export default authenSlice.reducer;