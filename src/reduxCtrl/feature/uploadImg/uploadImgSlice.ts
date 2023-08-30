import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ImgType } from '../type';
import { uploadImages } from './uploadImgService';

export interface InitialState {
    img: ImgType[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
}

const initialState: InitialState = {
    img: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
};

export const uploadImgSlice = createSlice({
    name: 'uploadImg',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImages.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.img = action.payload;
            })
            .addCase(uploadImages.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            });
    },
});

export default uploadImgSlice.reducer;
