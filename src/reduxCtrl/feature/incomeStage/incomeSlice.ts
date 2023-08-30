'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IncomeType } from '../type';
import { getMonthlyIncome, getYearlyIncome } from './incomeService';

type InitialState = {
    monthlyIncome: IncomeType[];
    yearlyIncome: IncomeType[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    monthlyIncome: [],
    yearlyIncome: [],
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
            .addCase(getMonthlyIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyIncome.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.monthlyIncome = action.payload;
                }
            })
            .addCase(getMonthlyIncome.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.monthlyIncome = [];
            })
            .addCase(getYearlyIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyIncome.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.yearlyIncome = action.payload;
                }
            })
            .addCase(getYearlyIncome.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.yearlyIncome = [];
            });
    },
});

export default income.reducer;
