import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';
import { OptionType } from '../type';

export const getColor = createAsyncThunk('color/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/color/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getAllColors = createAsyncThunk('color/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/color', request.getToken() as string);
        const result = await response.json();
        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createColor = createAsyncThunk('/color/create', async (data: Omit<OptionType, 'id' | '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.post('/color', data, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateAColor = createAsyncThunk('/color/update', async (body: Omit<OptionType, '_id'>, thunkAPI) => {
    try {
        const response: Response = await request.put(`/color/${body.id}`, body, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteColor = createAsyncThunk('color/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/color/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
