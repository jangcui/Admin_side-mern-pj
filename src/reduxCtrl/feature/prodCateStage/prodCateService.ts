import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';
import { OptionType } from '../type';

export const getAllProdCates = createAsyncThunk('productCategory/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/prod-category');
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateAProdCate = createAsyncThunk(
    'productCategory/update',
    async (body: Omit<OptionType, '_id'>, thunkAPI) => {
        try {
            const response: Response = await request.put(
                `/prod-category/${body.id}`,
                body,
                request.getToken() as string,
            );
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

export const deleteProdCate = createAsyncThunk('productCategory/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/prod-category/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getProdCate = createAsyncThunk('productCategory/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/prod-category/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createProdCate = createAsyncThunk(
    'productCategory/create',
    async (data: Omit<OptionType, '_id'>, thunkAPI) => {
        try {
            const response: Response = await request.post('/prod-category', data, request.getToken() as string);
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
