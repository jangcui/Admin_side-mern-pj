import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CouponType } from '../type';
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateACoupon } from './couponService';

type InitialState = {
    couponList: CouponType[];
    coupon: CouponType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    couponList: [],
    coupon: {
        _id: '',
        name: '',
        discount: 0,
        expiry: '',
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
};
export const resetCouponState = createAction('Reset_Coupon_State');
export const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCoupons.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;

                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data?._id,
                            name: data?.name,
                            expiry: data?.expiry,
                            percentage: data?.discount,
                        };
                        return filterData;
                    });
                    state.couponList = [...result];
                } else {
                    toast.error('Coupon get failed');
                }
            })
            .addCase(getAllCoupons.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Created new Coupon Code Created.');
            })
            .addCase(createCoupon.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(getCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupon.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                const { _v, ...data } = action.payload;
                state.coupon = data;
            })
            .addCase(getCoupon.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(updateACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateACoupon.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Coupon Code Updated.');
            })
            .addCase(updateACoupon.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted!');
            })
            .addCase(deleteCoupon.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Some thing went wrong!');
            })
            .addCase(resetCouponState, () => initialState);
    },
});

export default couponSlice.reducer;
