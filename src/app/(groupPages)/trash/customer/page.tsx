'use client';

import ForwardTable from 'antd/lib/table/Table';
import { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ModalCustom from '~/components/ModalCustom';
import { deleteUser, toggleCustomerToTrashBin } from '~/reduxCtrl/feature/customerStage/customerService';
import { getCustomersTrash } from '~/reduxCtrl/feature/trashStage/trashServer';
import { AppDispatch, RootState } from '~/reduxCtrl/store';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    name: string;
    mobile: number;
    deadline: string;
    address: string;
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
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Auto Delete',
        dataIndex: 'deadline',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function CustomerTrash() {
    const dispatch = useDispatch<AppDispatch>();
    const { customerTrash } = useSelector((state: RootState) => state.trashBinData);
    const [productId, setProductId] = useState<string>('');

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalReturn, setOpenModalReturn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getCustomersTrash());
    }, [dispatch]);

    const showModalDelete = (value?: string) => {
        setOpenModalDelete(true);
        if (value) {
            setProductId(value);
        }
    };
    const showModalReturn = (value?: string) => {
        setOpenModalReturn(true);
        if (value) {
            setProductId(value);
        }
    };
    const handleDelete = async (id: string) => {
        setOpenModalDelete(false);
        await dispatch(deleteUser(id));
        await dispatch(getCustomersTrash());
    };

    const handleRecovered = async (id?: string) => {
        if (id) {
            setOpenModalReturn(false);
            await dispatch(toggleCustomerToTrashBin(id));
            setTimeout(() => {
                dispatch(getCustomersTrash());
                toast.info('Recovered User!');
            }, 200);
        }
    };

    const data1: DataType[] = [];
    for (let i = 0; i < customerTrash.length; i++) {
        const currentDate: Date = new Date();
        const deleteDate = new Date(customerTrash[i]?.deleteDate);
        const deadline = Math.floor((deleteDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        data1.push({
            key: i + 1,
            name: customerTrash[i].first_name + customerTrash[i].last_name,
            mobile: customerTrash[i].mobile,
            deadline: `After ${deadline} days`,
            address: customerTrash[i].address,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => showModalReturn(customerTrash[i]._id)}>
                        <BsArrowReturnLeft className="icon" />
                    </button>
                    <button onClick={() => showModalDelete(customerTrash[i]._id)}>
                        <TiDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Customer Trash</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'Delete Now?'}
                    open={openModalDelete}
                    onOk={() => handleDelete(productId)}
                    onCancel={() => setOpenModalDelete(false)}
                />
                <ModalCustom
                    title={'Recover Product?'}
                    open={openModalReturn}
                    onOk={() => handleRecovered(productId)}
                    onCancel={() => setOpenModalReturn(false)}
                />
            </div>
        </div>
    );
}

export default CustomerTrash;
