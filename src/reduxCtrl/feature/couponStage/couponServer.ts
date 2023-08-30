import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';
import { CouponType } from '../type';

export const getCoupon = createAsyncThunk('coupon/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/coupon/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getAllCoupons = createAsyncThunk('coupon/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/coupon', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createCoupon = createAsyncThunk('coupon/create', async (data: Omit<CouponType, '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.post('/coupon', data, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateACoupon = createAsyncThunk(
    'coupon/update',
    async ({ id, data }: { id: string; data: Omit<CouponType, '_id'> }, thunkAPI) => {
        try {
            const response: Response = await request.put(`/coupon/${id}`, data, request.getToken() as string);
            const result = await response.json();

            if (response.status < 200 || response.status >= 300) {
                return thunkAPI.rejectWithValue(result);
            }

            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const deleteCoupon = createAsyncThunk('coupon/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/coupon/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
