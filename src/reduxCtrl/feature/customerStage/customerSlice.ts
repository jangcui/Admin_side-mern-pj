'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../type';
import { toast } from 'react-toastify';
import { deleteUser, getAllUsers, toggleCustomerToTrashBin } from './customerService';

type InitialState = {
    customerList: UserType[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    customerList: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const income = createSlice({
    name: 'income',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            id: data._id,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            mobile: data.mobile,
                            role: data.role,
                            isDelete: data.isDelete,
                            isBlocked: data.isBlocked,
                        };
                        return filterData;
                    });
                    state.customerList = [...result];
                } else {
                    toast.error('Customer list get failed!');
                }
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(toggleCustomerToTrashBin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleCustomerToTrashBin.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(toggleCustomerToTrashBin.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong');
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Deleted.');
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong');
            });
    },
});

export default income.reducer;
