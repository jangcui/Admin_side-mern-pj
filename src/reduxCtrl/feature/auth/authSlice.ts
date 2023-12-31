'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthType } from '../type';
import { checkCurrentAdmin, login, logout } from './authService';

export type InitialState = {
    isLoading: boolean;
    isLogin: boolean;
    isError: boolean;
    isSuccess: boolean;
    admin: AuthType;
    message: string;
};

const initialState: InitialState = {
    admin: { _id: '', first_name: '', last_name: '', email: '', mobile: '' },
    isLogin: false,
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
                if (action.payload) {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    const { token, ...data } = action.payload;
                    state.admin = data;
                    state.isLogin = true;
                    localStorage.setItem('TOKEN', action.payload.token);
                    toast.success('Logged In.');
                }
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
                toast.error(action.payload.message);
            })
            .addCase(checkCurrentAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkCurrentAdmin.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.isLogin = true;
                if (action.payload) {
                    state.admin = action.payload.admin;
                }
            })
            .addCase(checkCurrentAdmin.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.isLogin = false;
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
            })
            .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
                toast.error(action.payload.message);
            });
    },
});

export default auth.reducer;
