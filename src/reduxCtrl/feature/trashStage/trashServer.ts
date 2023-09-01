import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const getProductTrash = createAsyncThunk('trash/products', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/trash/products', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getCustomersTrash = createAsyncThunk('trash/customers', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/trash/users', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const clearCustomersTrash = createAsyncThunk('trash/customers/clear', async (__, thunkAPI) => {
    try {
        const response: Response = await request.Delete('/trash/users', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getBlogsTrash = createAsyncThunk('trash/blogs', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/trash/blogs', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
