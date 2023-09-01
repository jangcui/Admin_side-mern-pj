'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderListType, OrderType } from '../type';
import { deleteOrder, getAllOrders, getAOrder, updateOrderStatus } from './orderService';
import { toast } from 'react-toastify';

const orderInit = {
    totalPrice: 0,
    shipping: {
        address: '',
        city: '',
        state: '',
        country: '',
    },
    orderItems: [],
    user: {
        first_name: '',
        last_name: '',
        mobile: 0,
        email: '',
    },
    amount: 1,
};

type InitialState = {
    orderList: OrderListType[];
    order: OrderType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    orderList: [],
    order: orderInit,
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const orderList = createSlice({
    name: 'orderList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action?.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            id: data._id,
                            user: {
                                first_name: data.user.first_name,
                                last_name: data.user.last_name,
                            },
                            dPrice: data.total_price_after_discount,
                            orderItems: data.orderItems,
                            status: data.order_status,
                            createdAt: data.createdAt,
                        };
                        return filterData;
                    });
                    state.orderList = [...result];
                } else {
                    toast.error('Orders get failed!');
                }
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(updateOrderStatus.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(getAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const { orderItems, shippingInfo, total_price_after_discount, user } = action.payload;
                    const data = {
                        totalPrice: total_price_after_discount,
                        shipping: {
                            address: shippingInfo?.address,
                            city: shippingInfo?.city,
                            state: shippingInfo?.state,
                            country: shippingInfo?.country,
                        },
                        orderItems: orderItems,
                        user: {
                            first_name: user?.first_name,
                            last_name: user?.last_name,
                            mobile: user?.mobile,
                            email: user?.email,
                        },
                        amount: orderItems?.length,
                    };
                    state.order = data;
                } else {
                    toast.error('Order get failed!');
                }
            })
            .addCase(getAOrder.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted');
            })
            .addCase(deleteOrder.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            });
    },
});

export default orderList.reducer;
