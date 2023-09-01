import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import incomeReducer from './feature/incomeStage/incomeSlice';
import orderListReducer from './feature/orderStage/orderSlice';
import customerReducer from './feature/customerStage/customerSlice';
import uploadImgReducer from './feature/uploadImg/uploadImgSlice';
import brandsReducer from './feature/brandStage/brandSlice';
import prodCateReducer from './feature/prodCateStage/prodCateSlice';
import colorReducer from './feature/colorStage/colorSlice';
import productReducer from './feature/productStage/productSlice';
import blogReducer from './feature/blogState/blogSlice';
import blogCateReducer from './feature/blogCateStage/blogCateSlice';
import discountReducer from './feature/discountStage/discountLice';
import couponReducer from './feature/couponStage/couponSlice';
import trashReducer from './feature/trashStage/trashSlice';
import enquiryReducer from './feature/enquiryStage/enquirySlice';
import modalReducer from './feature/modal/modalSlice';

export const store: any = configureStore({
    reducer: {
        auth: authReducer,
        incomeData: incomeReducer,
        orderListData: orderListReducer,
        customerListData: customerReducer,
        uploadImg: uploadImgReducer,
        brandData: brandsReducer,
        prodCateData: prodCateReducer,
        colorData: colorReducer,
        productData: productReducer,
        blogData: blogReducer,
        blogCateData: blogCateReducer,
        discountData: discountReducer,
        couponData: couponReducer,
        trashBinData: trashReducer,
        enquiryData: enquiryReducer,
        modalHandle: modalReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
