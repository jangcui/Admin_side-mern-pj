'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthType } from '../type';
import { toast } from 'react-toastify';
import { login, logout, refreshToken } from './authService';

export type InitialState = {
    isLoading: boolean;
    isLogin: boolean;
    isError: boolean;
    isSuccess: boolean;
    admin: AuthType;
    message: string;
};

export const getAdminInfo = () => {
    const adminJSON = localStorage.getItem('ADMIN');
    return adminJSON ? JSON.parse(adminJSON) : null;
};
const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ADMIN');
};
const initialState: InitialState = {
    admin: getAdminInfo(),
    isLogin: getAdminInfo() != null ? true : false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.isLogin = true;

                if (action.payload !== null) {
                    const { token, ...data } = action.payload;
                    state.admin = data;
                    localStorage.setItem('TOKEN', token);
                    localStorage.setItem('ADMIN', JSON.stringify(data));
                }
                toast.success('Logged In.');
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
                toast.error(action.payload.message);
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.isLogin = false;
                toast.info('Logged Out!');
                handleLogout();
            })
            .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
                toast.error(action.payload.message);
            })
            .addCase(refreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.isLogin = false;
                localStorage.setItem('TOKEN', action.payload.token);
            })
            .addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
                toast.info('Login session has expired, please log in again.');
                handleLogout();
            });
    },
});

export default auth.reducer;
