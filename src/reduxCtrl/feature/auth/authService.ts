import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

interface LoginType {
    email: string;
    password: string;
}

export const login = createAsyncThunk('login', async (data: LoginType, thunkAPI) => {
    try {
        const response: Response = await request.post(`/admin/login`, data);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const checkCurrentAdmin = createAsyncThunk('check_is_login', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get(`/admin/login`);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('logout', async (__, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/admin/logout`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const refreshToken = createAsyncThunk('refreshToken', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get(`/admin/refresh`);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
