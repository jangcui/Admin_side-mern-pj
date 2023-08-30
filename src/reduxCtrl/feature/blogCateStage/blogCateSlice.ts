import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { OptionType } from '../type';
import { createBlogCate, deleteBlogCate, getAllBlogCates, getBlogCate, updateABlogCate } from './blogCateService';

type InitialState = {
    blogCateList: OptionType[];
    blogCate: OptionType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    blogCateList: [],
    blogCate: { _id: '', title: '' },
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const resetBlogCateState = createAction('Reset_blogCate_State');

export const blogCateSlice = createSlice({
    name: 'blogCateData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogCates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogCates.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogCateList = action.payload;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            id: data._id,
                            title: data.title,
                        };
                        return filterData;
                    });
                    state.blogCateList = [...result];
                }
            })
            .addCase(getAllBlogCates.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(createBlogCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogCate = action.payload;
                toast.success('Created new Blog Category created');
            })
            .addCase(createBlogCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(getBlogCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    state.blogCate = action.payload;
                } else {
                    toast.error('Blog category get failed!');
                }
            })
            .addCase(getBlogCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Blog category get failed!');
            })
            .addCase(updateABlogCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlogCate.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Blog Category updated.');
                state.blogCate = action.payload.title;
            })
            .addCase(updateABlogCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(deleteBlogCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlogCate.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted');
            })
            .addCase(deleteBlogCate.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(resetBlogCateState, () => initialState);
    },
});

export default blogCateSlice.reducer;
