'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import { getAnEnquiry, updateStatusEnquiry } from '~/reduxCtrl/feature/enquiryStage/enquiryServer';
import { resetEnquiryState } from '~/reduxCtrl/feature/enquiryStage/enquirySlice';
import { AppDispatch, RootState } from '~/reduxCtrl/store';

function Enquiry({ params }: { params: { enquiryId: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const { enquiry } = useSelector((state: RootState) => state.enquiryData);

    const navigate = useRouter();

    useEffect(() => {
        if (params.enquiryId) {
            dispatch(getAnEnquiry(params.enquiryId[0]));
        } else {
            dispatch(resetEnquiryState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const setEnquiryStatus = async (value: string) => {
        if (params.enquiryId) {
            const data = { id: params.enquiryId[0], status: value };
            await dispatch(updateStatusEnquiry(data));
            dispatch(resetEnquiryState());
            await dispatch(getAnEnquiry(params.enquiryId[0]));
        }
    };
    const handleBack = () => {
        navigate.back();
    };
    return (
        <div className="wrapper">
            <div className="flex justify-between items-center w-full">
                <h1 className="title"> View Enquiry</h1>
                <button className="flex items-center gap-4 " onClick={handleBack}>
                    <IoMdArrowBack className="text-4xl" />
                    <p className="text-4xl"> Go back</p>
                </button>
            </div>
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl font-bold">Name:</h3>
                <span>{enquiry.name}</span>
            </div>
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl">Mobile:</h3>
                <button className="btn-action">
                    <i>{enquiry.mobile}</i>
                </button>
            </div>{' '}
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl font-bold">Email:</h3>
                <button className="btn-action">
                    <i> {enquiry.email}</i>
                </button>
            </div>{' '}
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl font-bold">Comment:</h3>
                <span>{enquiry.comment}</span>
            </div>{' '}
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl font-bold">Status:</h3>
                <span>{enquiry.status}</span>
            </div>
            <div className="flex items-center gap-20 mb-10">
                <h3 className="text-3xl font-bold">Change Status:</h3>
                <span>
                    <select
                        className="w-full border-collapse px-3 py-4 cursor-pointer  rounded-sm shadow-primary drop-shadow-md"
                        defaultValue={enquiry.status ? enquiry.status : 'Submitted'}
                        onChange={(e) => setEnquiryStatus(e.target.value)}
                    >
                        <option value="Contacted">Contacted</option>
                        <option value="Submitted">Submitted</option>
                        <option value="In progress">In progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </span>
            </div>
        </div>
    );
}

export default Enquiry;
