import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { getBlogsTrash, getCustomersTrash, getProductTrash } from './trashServer';
import { TrashBlogType, TrashCustomerType, TrashProductType } from '../type';

type InitialState = {
    productTrash: TrashProductType[];
    customerTrash: TrashCustomerType[];
    blogTrash: TrashBlogType[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    productTrash: [],
    blogTrash: [],
    customerTrash: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
};
export const resetTrashBinState = createAction('Reset_TrashBin_State');

export const trashSlice = createSlice({
    name: 'trash-bin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductTrash.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductTrash.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data?._id,
                            title: data?.title,
                            brand: data?.brand,
                            price: data?.price,
                            category: data?.category,
                            quantity: data?.quantity,
                            sold: data?.sold,
                            deleteDate: data?.deleteDate,
                        };
                        return filterData;
                    });
                    state.productTrash = [...result];
                }
            })
            .addCase(getProductTrash.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(getCustomersTrash.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomersTrash.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.customerTrash = action.payload;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data?._id,
                            fist_name: data?.fist_name,
                            last_name: data?.last_name,
                            address: data?.address,
                            mobile: data?.mobile,
                            deleteDate: data?.deleteDate,
                        };
                        return filterData;
                    });
                    state.customerTrash = [...result];
                }
            })
            .addCase(getCustomersTrash.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(getBlogsTrash.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogsTrash.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;

                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data?._id,
                            title: data?.title,
                            category: data?.category,
                            numViews: data?.numViews,
                            likes: data?.dislikes?.length,
                            dislikes: data?.dislikes?.length,
                            author: data?.author,
                            deleteDate: data?.deleteDate,
                        };
                        return filterData;
                    });
                    state.blogTrash = [...result];
                }
            })
            .addCase(getBlogsTrash.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })

            .addCase(resetTrashBinState, () => initialState);
    },
});

export default trashSlice.reducer;
