'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthType } from '../type';
import { toast } from 'react-toastify';
import { login, logout } from './authService';

export type InitialState = {
    isLoading: boolean;
    isLogin: boolean;
    isError: boolean;
    isSuccess: boolean;
    admin: AuthType;
    message: string;
};

const checkLogin = () => {
    const isLogin = localStorage.getItem('isLogin') === 'true';
    return isLogin;
};

export const getAdminInfo = () => {
    try {
        const adminJSON = localStorage.getItem('ADMIN');
        return adminJSON ? JSON.parse(adminJSON) : null;
    } catch (error) {
        console.error('Error reading ADMIN from local storage:', error);
        return null;
    }
};

const initialState: InitialState = {
    admin: getAdminInfo(),
    isLogin: checkLogin(),
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
                localStorage.setItem('isLogin', true.toString());

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
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('ADMIN');
                localStorage.removeItem('isLogin');
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
