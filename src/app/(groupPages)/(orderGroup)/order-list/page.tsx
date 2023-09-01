'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ForwardTable from 'antd/lib/table/Table';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteOrder, getAllOrders, updateOrderStatus } from '~/reduxCtrl/feature/orderStage/orderService';
import { useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';
import ModalCustom from '~/components/ModalCustom';

interface DataType {
    key: React.Key;
    name: string;
    detail: JSX.Element;
    date: string;
    status: JSX.Element;
}
const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'User Order',
        dataIndex: 'name',
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
    },

    {
        title: 'Order date',
        dataIndex: 'date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

function OrderList() {
    const dispatch = useDispatch<AppDispatch>();
    const { orderList } = useSelector((state: RootState) => state.orderListData);

    const [orderId, setOrderId] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setOrderId(value);
        }
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1: DataType[] = [];
    for (let i = 0; i < orderList?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderList[i].user.first_name + ' ' + orderList[i].user.last_name || '',
            detail: (
                <>
                    <button onClick={() => navigate.push(`order/${orderList[i]?.id}`)}>
                        <p className="text-light-blue text-xxl italic underline hover:underline-offset-2">
                            Go to detail.
                        </p>
                    </button>
                </>
            ),
            date: new Date(orderList[i].createdAt)
                .toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                .replace(' ', ', '),
            status: (
                <div className="flex gap-10 items-center">
                    <select
                        onChange={(e) => handleUpdateStatusOrder(orderList[i]?.id, e.target.value)}
                        className="py-4 px-6 font-semibold"
                        defaultValue={orderList[i]?.status}
                    >
                        <option value="Ordered">Ordered </option>
                        <option value="Processed">Processed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <button onClick={() => showModal(orderList[i]?.id)}>
                        <AiFillDelete className="icon text-error" />{' '}
                    </button>
                </div>
            ),
        });
    }

    const handleUpdateStatusOrder = (id: string, status: string) => {
        dispatch(updateOrderStatus({ id: id, order_status: status }));
    };
    const handleDeleteOrder = async (id: string) => {
        hideModal();
        await dispatch(deleteOrder(id));
        await dispatch(getAllOrders());
    };

    return (
        <div className="wrapper">
            <h1 className="title">Order List: </h1>
            <ModalCustom
                title={'Delete this order?'}
                open={open}
                onOk={() => handleDeleteOrder(orderId)}
                onCancel={hideModal}
            />
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
            </div>
        </div>
    );
}

export default OrderList;
