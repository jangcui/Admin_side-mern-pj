import { createAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAnEnquiry, getAllEnquiries, updateStatusEnquiry, deleteEnquiry } from './enquirySevice';
import { EnquiryStageType } from '../type';

type InitialState = {
    enquiryList: EnquiryStageType[];
    enquiry: EnquiryStageType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

const initialState: InitialState = {
    enquiryList: [],
    enquiry: {
        _id: '',
        name: '',
        email: '',
        mobile: '',
        comment: '',
        status: '',
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
};
export const resetEnquiryState = createAction('Reset_Enquiry_State');

export const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAnEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                const { __v, ...data } = action.payload;
                state.enquiry = data;
            })
            .addCase(getAnEnquiry.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(getAllEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload) {
                    const result = action?.payload?.map((data: any) => {
                        const filterData = {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            mobile: data.mobile,
                            comment: data.comment,
                            status: data.status,
                        };
                        return filterData;
                    });
                    state.enquiryList = [...result];
                }
            })
            .addCase(getAllEnquiries.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                toast.error('Something went wrong');
                state.isLoading = false;
            })

            .addCase(updateStatusEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStatusEnquiry.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Updated.');
            })
            .addCase(updateStatusEnquiry.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                toast.error('Something went wrong');
                state.isLoading = false;
            })
            .addCase(deleteEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEnquiry.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                toast.info('Deleted.');
            })
            .addCase(deleteEnquiry.rejected, (state) => {
                state.isError = true;
                state.isSuccess = false;
                toast.error('Something went wrong');
                state.isLoading = false;
            })
            .addCase(resetEnquiryState, () => initialState);
    },
});

export default enquirySlice.reducer;
