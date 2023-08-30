'use client';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionType } from '../type';
import { toast } from 'react-toastify';
import { createBrand, deleteBrand, getBrand, getAllBrands, updateABrand } from './brandService';

type InitialState = {
    brandList: OptionType[];
    brand: OptionType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    brandList: [],
    brand: { _id: '', title: '' },
    isLoading: false,
    isError: false,
    isSuccess: false,
};
export const resetBrandState = createAction('Reset_Brand_State');
export const brandsSlice = createSlice({
    name: 'brandData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrands.fulfilled, (state, action: PayloadAction<any>) => {
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
                    state.brandList = [...result];
                }
            })
            .addCase(getAllBrands.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.brand = action.payload;
                toast.success('Created new Brand ');
            })
            .addCase(createBrand.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(getBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.brand = action.payload;
                } else {
                    toast.error('Brand get failed!');
                }
            })
            .addCase(getBrand.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(updateABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Brand updated.');
                state.brand = action.payload.title;
            })
            .addCase(updateABrand.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted');
            })
            .addCase(deleteBrand.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(resetBrandState, () => initialState);
    },
});

export default brandsSlice.reducer;
