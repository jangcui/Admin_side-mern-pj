import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const getAnEnquiry = createAsyncThunk('enquiry/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/enquiry/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getAllEnquiries = createAsyncThunk('enquiry/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/enquiry', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateStatusEnquiry = createAsyncThunk(
    'enquiry/update',
    async ({ id, status }: { id: string; status: string }, thunkAPI) => {
        try {
            const response: Response = await request.put(`/enquiry/${id}`, { status }, request.getToken() as string);
            const result = await response.json();

            if (response.status < 200 || response.status >= 300) {
                return thunkAPI.rejectWithValue(result);
            }

            return result;
        } catch (error: any) {
            if (error.name === 'AxiosError' && error.response.status === 422) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
            throw error;
        }
    },
);

export const deleteEnquiry = createAsyncThunk('enquiry/delete', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/enquiry/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
