import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';

export const getBlog = createAsyncThunk('/blog/get', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/blog/${id}`);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const toggleBlogToTrashBin = createAsyncThunk('blog/add-to-trash-bin', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.put(`/blog/trash/${id}`, '', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getAllBlogs = createAsyncThunk('blog/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/blog');
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createBlog = createAsyncThunk('blog/create', async (data: any, thunkAPI) => {
    try {
        const response: Response = await request.post('/blog', data, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateABlog = createAsyncThunk(
    'blog/update',
    async ({ id, body }: { id: string; body: any }, thunkAPI) => {
        try {
            const response: Response = await request.put(`/blog/${id}`, body, request.getToken() as string);
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

export const deleteBlog = createAsyncThunk('blog/delete', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/blog/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
