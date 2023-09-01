'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ForwardTable from 'antd/lib/table/Table';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { getAOrder } from '~/reduxCtrl/feature/orderStage/orderService';

interface DataType {
    name: string;
    amount: number;
    product: JSX.Element;
    totalPrice: JSX.Element;
    shipping: string;
    contact: JSX.Element;
}

const column: any = [
    {
        title: 'User Order',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Shipping',
        dataIndex: 'shipping',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
    },
];

function OrderPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { order } = useSelector((state: RootState) => state.orderListData);

    const pathname = useParams();
    const orderId = pathname?.orderId;

    useEffect(() => {
        if (orderId !== undefined) {
            dispatch(getAOrder(orderId[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const data1: DataType[] = [];
    data1.push({
        name: order?.user.first_name + ' ' + order?.user.last_name,
        product: (
            <div className="flex flex-col gap-6">
                {order?.orderItems.map((item, index) => (
                    <div key={index}>
                        <p style={{ fontWeight: '600' }}>{item.productId.title} </p>
                        <div className="flex gap-5 items-center mt-4">
                            <span
                                className="w-[16px] h-[16px] rounded-full border-2"
                                style={{ backgroundColor: item.productId.brand }}
                            ></span>
                            <span>
                                Brand: <i className="font-semibold">{item.productId.brand}</i>
                            </span>
                            <span>
                                Category: <i className="font-semibold">{item.productId.category}</i>
                            </span>
                            <span>
                                Tags: <i className="font-semibold">{item.productId.tags}</i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ),
        contact: (
            <div>
                <p className="mb-3 font-semibold text-xxl cursor-pointer underline underline-offset-2 hover:text-blue-500 ">
                    {order.user.email}
                </p>
                <p className="font-semibold text-xxl cursor-pointer underline-offset-2 hover:text-blue-500  ">
                    {order.user.mobile}
                </p>
            </div>
        ),
        shipping: order?.shipping?.address + ', ' + order?.shipping?.city,
        amount: order?.orderItems.length,
        totalPrice: <p>{order?.totalPrice}($)</p>,
    });

    return (
        <div className="wrapper">
            <h1 className="title">Detail Order:</h1>
            <div className="chart">
                <ForwardTable
                    columns={column}
                    dataSource={data1.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                />
            </div>
        </div>
    );
}

export default OrderPage;
