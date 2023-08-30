import { createAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    applyDiscount,
    createProduct,
    deleteProduct,
    getAProduct,
    getAllProducts,
    removeDiscount,
    toggleProductToTrashBin,
    updateAProduct,
} from './productService';
import { toast } from 'react-toastify';
import { ProductType } from '../type';

const initialProduct = {
    _id: '',
    tags: '',
    title: '',
    images: [],
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    sold: 0,
    slug: '',
    brand: '',
    color: [],
};

type InitialState = {
    productList: ProductType[];
    product: ProductType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
};

const initialState: InitialState = {
    productList: [],
    product: initialProduct,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const resetProductState = createAction('Reset_Product_State');

export const productSlice = createSlice({
    name: 'productStage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data._id,
                            tags: data.tags,
                            title: data.title,
                            images: data.images,
                            description: data.description,
                            discountCode: data.discountCode,
                            price: data.price,
                            quantity: data.quantity,
                            sold: data.sold,
                            category: data.category,
                            slug: data.slug,
                            brand: data.brand,
                            color: data.color,
                        };
                        return filterData;
                    });
                    state.productList = [...result];
                }
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Product Created.');
            })
            .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
                state.message = action.payload.message;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const { sold, totalRating, ratings, __v, price_after_discount, ...data } = action.payload;
                    state.product = data;
                } else {
                    toast.error('Product get failed!');
                }
            })
            .addCase(getAProduct.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Product get failed!');
            })
            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const { sold, totalRating, ratings, __v, price_after_discount, ...data } = action.payload;
                    state.product = data;
                }
                toast.success('Product updated.');
            })
            .addCase(updateAProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
                state.message = action.payload.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.error(`Deleted`);
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(toggleProductToTrashBin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleProductToTrashBin.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(toggleProductToTrashBin.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                toast.error('Something went wrong');
                state.isLoading = false;
            })

            .addCase(applyDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyDiscount.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Applied.');
            })
            .addCase(applyDiscount.rejected, (state, action: PayloadAction<any>) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error(action.payload.error);
            })
            .addCase(removeDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeDiscount.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Removed!');
                state.product = action.payload;
            })
            .addCase(removeDiscount.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })

            .addCase(resetProductState, () => initialState);
    },
});

export default productSlice.reducer;
