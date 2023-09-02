import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/api/httpRequest';
import { DiscountType } from '../type';

export const getDiscount = createAsyncThunk('discount/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/discount/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getAllDiscounts = createAsyncThunk('discount/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/discount', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createDiscount = createAsyncThunk('discount/create', async (data: Omit<DiscountType, '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.post('/discount', data, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateADiscount = createAsyncThunk(
    'discount/update',
    async ({ id, data }: { id: string; data: Omit<DiscountType, '_id'> }, thunkAPI) => {
        try {
            const response: Response = await request.put(`/discount/${id}`, data, request.getToken() as string);
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

export const deleteDiscount = createAsyncThunk('discount/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/discount/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
