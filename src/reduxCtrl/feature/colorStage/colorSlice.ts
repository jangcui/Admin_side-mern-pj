'use client';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionType } from '../type';
import { toast } from 'react-toastify';
import { createColor, deleteColor, getColor, getAllColors, updateAColor } from './colorService';

type InitialState = {
    colorList: OptionType[];
    color: OptionType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    colorList: [],
    color: { _id: '', title: '' },
    isLoading: false,
    isError: false,
    isSuccess: false,
};
export const resetColorState = createAction('Reset_Color_State');

export const colorSlice = createSlice({
    name: 'colorData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColors.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            id: data._id,
                            title: data.title,
                        };
                        return filterData;
                    });
                    state.colorList = [...result];
                }
            })
            .addCase(getAllColors.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.color = action.payload;
                toast.success('Created new Color.');
            })
            .addCase(createColor.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(getColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColor.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.color = action.payload;
                } else {
                    toast.error('Color get failed!');
                }
            })
            .addCase(getColor.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(updateAColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAColor.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Color updated.');
                state.color = action.payload;
            })
            .addCase(updateAColor.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted');
            })
            .addCase(deleteColor.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(resetColorState, () => initialState);
    },
});

export default colorSlice.reducer;
