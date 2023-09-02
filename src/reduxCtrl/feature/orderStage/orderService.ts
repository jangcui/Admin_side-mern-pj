import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/api/httpRequest';

interface UpdateStatusOrderType {
    id: string;
    order_status: string;
}

export const getAllOrders = createAsyncThunk('admin/orders/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/admin/orders', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getAOrder = createAsyncThunk('admin/order/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/admin/order/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const deleteOrder = createAsyncThunk('admin/orders/delete', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/admin/order/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateOrderStatus = createAsyncThunk(
    'admin/order/update-status',
    async (data: UpdateStatusOrderType, thunkAPI) => {
        try {
            const response: Response = await request.put(
                `/admin/order/${data.id}`,
                { order_status: data.order_status },
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
