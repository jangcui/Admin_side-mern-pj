import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const getMonthlyIncome = createAsyncThunk('admin/get/monthly-income', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/admin/month-wise-order-income', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getYearlyIncome = createAsyncThunk('admin/get/yearly-income', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/admin/year-total-orders', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
