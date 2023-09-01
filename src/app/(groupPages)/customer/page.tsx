'use client';

import ForwardTable from 'antd/lib/table/Table';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ModalCustom from '~/components/ModalCustom';
import { getAllUsers, toggleCustomerToTrashBin } from '~/reduxCtrl/feature/customerStage/customerService';
import { AppDispatch, RootState } from '~/reduxCtrl/store';

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    mobile: string;
    blocked: string;
    action: JSX.Element;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Blocked',
        dataIndex: 'blocked',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function Page() {
    const dispatch = useDispatch<AppDispatch>();

    const { customerList } = useSelector((state: RootState) => state.customerListData);
    const [blogId, setBlogId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setBlogId(value);
        }
    };
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id: string) => {
        hideModal();
        await dispatch(toggleCustomerToTrashBin(id));
        setTimeout(() => {
            dispatch(getAllUsers());
            toast.info('Added User to trash bin.!');
        }, 200);
    };

    const data1: DataType[] = [];
    if (customerList) {
        for (let i = 0; i < customerList.length; i++) {
            if (customerList[i].role !== 'admin') {
                data1.push({
                    key: i + 1,
                    name: ` ${customerList[i].first_name} ${customerList[i].last_name} `,
                    email: customerList[i].email,
                    mobile: customerList[i].mobile,
                    blocked: `${customerList[i].isBlocked}`,
                    action: (
                        <>
                            {/* <button  to={`/admin/blog/${customerList[i].id}`}>
                            <BiEdit className='icon' />
                         </button> */}
                            <button onClick={() => showModal(customerList[i].id)}>
                                <AiFillDelete className="icon text-danger" />
                            </button>
                        </>
                    ),
                });
            }
        }
    }

    return (
        <div>
            <h1 className="title">Customers</h1>
            <div>
                <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
                title={'Remove from trash bin?'}
                open={open}
                onOk={() => handleDelete(blogId)}
                onCancel={hideModal}
            />
        </div>
    );
}

export default Page;
