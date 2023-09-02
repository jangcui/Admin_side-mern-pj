import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/api/httpRequest';
import { OptionType } from '../type';

export const getAllBlogCates = createAsyncThunk('blogCategory/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/blog-category', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateABlogCate = createAsyncThunk(
    'blogCategory/update',
    async (data: Omit<OptionType, '_id'>, thunkAPI) => {
        try {
            const response: Response = await request.put(
                `/blog-category/${data.id}`,
                data,
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

export const deleteBlogCate = createAsyncThunk('blogCategory/delete', async (id: string | any, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/blog-category/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getBlogCate = createAsyncThunk('blogCategory/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/blog-category/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createBlogCate = createAsyncThunk(
    'blogCategory/create',
    async (data: Omit<OptionType, '_id'>, thunkAPI) => {
        try {
            const response: Response = await request.post('/blog-category', data, request.getToken() as string);
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
