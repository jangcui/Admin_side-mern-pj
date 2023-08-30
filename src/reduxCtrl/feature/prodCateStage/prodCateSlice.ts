import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { createProdCate, deleteProdCate, getProdCate, getAllProdCates, updateAProdCate } from './prodCateService';
import { OptionType } from '../type';

type InitialState = {
    prodCateList: OptionType[];
    prodCate: OptionType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    prodCateList: [],
    prodCate: { _id: '', title: '' },
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const resetProdCateState = createAction('Reset_ProdCate_State');
export const prodCateSlice = createSlice({
    name: 'productCateData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProdCates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProdCates.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.prodCateList = action.payload;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            id: data._id,
                            title: data.title,
                        };
                        return filterData;
                    });
                    state.prodCateList = [...result];
                }
            })
            .addCase(getAllProdCates.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(createProdCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProdCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.prodCate = action.payload;
                toast.success('Created new Product Category.');
            })
            .addCase(createProdCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(getProdCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProdCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.prodCate = action.payload;
                } else {
                    toast.error('Product category get failed!');
                }
            })
            .addCase(getProdCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Product category get failed!');
            })
            .addCase(updateAProdCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProdCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Product Category updated.');
                state.prodCate = action.payload.title;
            })
            .addCase(updateAProdCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(deleteProdCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProdCate.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted');
            })
            .addCase(deleteProdCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(resetProdCateState, () => initialState);
    },
});

export default prodCateSlice.reducer;
