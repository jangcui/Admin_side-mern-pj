import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';
import { OptionType } from '../type';

export const getBrand = createAsyncThunk('brand/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/brand/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getAllBrands = createAsyncThunk('brand/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/brand');
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createBrand = createAsyncThunk('/brand/create', async (data: Omit<OptionType, 'id' | '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.post('/brand', data, request.getToken() as string);
        const result = await response.json();
        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateABrand = createAsyncThunk('/brand/update', async (body: Omit<OptionType, '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.put(`/brand/${body.id}`, body, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteBrand = createAsyncThunk('brand/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/brand/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
