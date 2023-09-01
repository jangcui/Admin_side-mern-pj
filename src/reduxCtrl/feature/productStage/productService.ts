import { createAsyncThunk } from '@reduxjs/toolkit';
import * as request from '~/reduxCtrl/fetchData/httpRequest';
import { ProductType } from '../type';

interface DiscountType {
    nameProduct: string;
    discountCode: string;
}

export const getAProduct = createAsyncThunk('product/get', async (slug: string, thunkAPI) => {
    try {
        const response: Response = await request.get(`/product/${slug.trim()}`);

        if (!response) {
            throw new Error('Get product failed');
        }
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const toggleProductToTrashBin = createAsyncThunk('product/add-to-trash-bin', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.put(`/product/trash/${id}`, '', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getAllProducts = createAsyncThunk('product/get-all', async (__, thunkAPI) => {
    try {
        const response: Response = await request.get('/product');
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createProduct = createAsyncThunk(
    'product/create',
    async (data: Omit<ProductType, 'slug' | 'sold' | '_id'>, thunkAPI) => {
        try {
            const response: Response = await request.post('/product', data, request.getToken() as string);
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
export const updateAProduct = createAsyncThunk(
    'product/update',
    async ({ id, body }: { id: string; body: Omit<ProductType, 'slug' | 'sold' | '_id'> }, thunkAPI) => {
        try {
            const response: Response = await request.put(`/product/${id}`, body, request.getToken() as string);
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

export const deleteProduct = createAsyncThunk('product/delete', async (id: string, thunkAPI) => {
    try {
        const response: Response = await request.Delete(`/product/${id}`, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const applyDiscount = createAsyncThunk('product/apply-discount', async (data: DiscountType, thunkAPI) => {
    try {
        const response: Response = await request.put('/product/discount', data, request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const removeDiscount = createAsyncThunk('product/remove-discount', async (slug: string, thunkAPI) => {
    try {
        const response: Response = await request.post(`/product/discount/${slug}`, '', request.getToken() as string);
        const result = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return thunkAPI.rejectWithValue(result);
        }

        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
