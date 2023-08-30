'use client';

import { toast } from 'react-toastify';
import { AiFillEye, AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ForwardTable from 'antd/lib/table/Table';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import ModalCustom from '~/components/ModalCustom';
import { deleteEnquiry, getAllEnquiries, updateStatusEnquiry } from '~/reduxCtrl/feature/enquiryStage/enquiryServer';
import { useRouter } from 'next/navigation';

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    mobile: string;
    action: JSX.Element;
    select: JSX.Element;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },

    {
        title: 'Status',
        dataIndex: 'select',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function EnquiryList() {
    const dispatch = useDispatch<AppDispatch>();
    const { enquiryList } = useSelector((state: RootState) => state.enquiryData);
    const [enqId, setEnqId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllEnquiries());
    }, [dispatch]);

    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setEnqId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id: string) => {
        hideModal();
        await dispatch(deleteEnquiry(id));
        await dispatch(getAllEnquiries());
    };
    const setEnquiryStatus = (id: string, value: string) => {
        const data = { id: id, status: value };
        dispatch(updateStatusEnquiry(data));
    };
    const data1: DataType[] = [];
    for (let i = 0; i < enquiryList.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryList[i].name,
            email: enquiryList[i].email,
            mobile: enquiryList[i].mobile,
            select: (
                <>
                    <select
                        className="w-full border-collapse px-3 py-4 cursor-pointer  rounded-sm shadow-primary drop-shadow-md"
                        defaultValue={enquiryList[i].status ? enquiryList[i].status : 'Submitted'}
                        onChange={(e) => setEnquiryStatus(enquiryList[i]._id, e.target.value)}
                    >
                        <option value="Contacted">Contacted</option>
                        <option value="Submitted">Submitted</option>
                        <option value="In progress">In progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`enquiry/${enquiryList[i]._id}`)}>
                        <AiFillEye className="icon text-primary" />
                    </button>
                    <button onClick={() => showModal(enquiryList[i]._id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }
    return (
        <div className="wrapper">
            <h1 className="title">Enquires</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This enquiry will be delete?'}
                    open={open}
                    onOk={() => handleDelete(enqId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default EnquiryList;
