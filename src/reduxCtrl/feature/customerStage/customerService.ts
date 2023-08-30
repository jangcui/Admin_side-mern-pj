import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const getAllUsers = createAsyncThunk('admin/user/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/admin/users', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const toggleCustomerToTrashBin = createAsyncThunk(
    'admin/user/add-to-trash-bin',
    async (id: string, thunkAPI) => {
        try {
            const response: Response = await request.put(`/admin/trash/${id}`, {}, request.getToken() as string);
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

export const deleteUser = createAsyncThunk('admin/user/delete', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/admin/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
