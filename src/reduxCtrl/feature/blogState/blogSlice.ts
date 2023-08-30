import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { createBlog, deleteBlog, getAllBlogs, getBlog, toggleBlogToTrashBin, updateABlog } from './blogService';
import { toast } from 'react-toastify';
import { BlogType } from '../type';

export interface BlogStageType {
    blogList: BlogType[];
    blog: BlogType;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
}

const initialState: BlogStageType = {
    blogList: [],
    blog: {
        _id: '',
        title: '',
        description: '',
        numView: 0,
        category: '',
        like: 0,
        author: '',
        dislike: 0,
        images: [],
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
};
export const resetBlogState = createAction('Reset_Blog_State');

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data._id,
                            title: data.title,
                            numView: data.numViews,
                            category: data.category,
                            author: data.author,
                            like: data?.like?.length || 0,
                            images: data.images,
                            dislike: data?.dislike?.length || 0,
                        };
                        return filterData;
                    });
                    state.blogList = [...result];
                } else {
                    toast.error('Blog get failed');
                }
            })
            .addCase(getAllBlogs.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })

            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Blog create successfully!');
            })
            .addCase(createBlog.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Blog create failed, something went wrong');
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const { title, description, category, images } = action.payload;
                    const data = {
                        ...state.blog,
                        title: title,
                        description: description,
                        category: category,
                        images: images,
                    };
                    state.blog = data;
                }
            })
            .addCase(getBlog.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Blog get failed, something went wrong');
            })
            .addCase(updateABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlog.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blog = action.payload;
                toast.success('Blog update successfully');
            })
            .addCase(updateABlog.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Blog update failed, something went wrong');
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted!');
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(toggleBlogToTrashBin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleBlogToTrashBin.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(toggleBlogToTrashBin.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                toast.error('Something went wrong');
            })
            .addCase(resetBlogState, () => initialState);
    },
});

export default blogSlice.reducer;
