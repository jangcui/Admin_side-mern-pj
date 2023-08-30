import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { createDiscount, deleteDiscount, getAllDiscounts, getDiscount, updateADiscount } from './discountService';
import { toast } from 'react-toastify';
import { DiscountType } from '../type';

type InitialState = {
    discountList: DiscountType[];
    discount: DiscountType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    discountList: [],
    discount: {
        _id: '',
        name: '',
        percentage: 0,
        expiry: '',
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
};

export const resetDiscountState = createAction('Reset_Discount_State');
export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDiscounts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDiscounts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;

                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data?._id,
                            name: data?.name,
                            expiry: data?.expiry,
                            percentage: data?.percentage,
                        };
                        return filterData;
                    });
                    state.discountList = [...result];
                } else {
                    toast.error('Discount get failed');
                }
            })
            .addCase(getAllDiscounts.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(createDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDiscount.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Created new Discount Code Created.');
            })
            .addCase(createDiscount.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(getDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDiscount.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                const { _v, ...data } = action.payload;
                state.discount = data;
            })
            .addCase(getDiscount.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(updateADiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateADiscount.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Discount Code Updated.');
            })
            .addCase(updateADiscount.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(deleteDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDiscount.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted!');
            })
            .addCase(deleteDiscount.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(resetDiscountState, () => initialState);
    },
});

export default discountSlice.reducer;
