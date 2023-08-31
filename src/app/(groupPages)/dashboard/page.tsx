'use client';

import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { Column } from '@ant-design/plots';
import ForwardTable from 'antd/lib/table/Table';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyIncome, getYearlyIncome } from '~/reduxCtrl/feature/incomeStage/incomeService';
import { getAllOrders } from '~/reduxCtrl/feature/orderStage/orderService';

interface DataType {
    key: React.Key;
    name: string;
    dPrice: number;
    product: number;
    status: string;
}
type DataIncomeType = {
    type?: string;
    income?: number;
    sales?: number;
};

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
        title: 'Product Count',
        dataIndex: 'product',
    },
    {
        title: 'Total Price',
        dataIndex: 'dPrice',
    },

    {
        title: 'Status',
        dataIndex: 'status',
    },
];

function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { monthlyIncome, yearlyIncome } = useSelector((state: RootState) => state.incomeData);
    const { orderList } = useSelector((state: RootState) => state.orderListData);

    const [dataMonthlyAmount, setDateMonthlyAmount] = useState<DataIncomeType[]>([]);
    const [dataMonthlyCount, setDateMonthlyCount] = useState<DataIncomeType[]>([]);
    const [dataOrders, setDataOrders] = useState<DataType[]>([]);

    useEffect(() => {
        dispatch(getMonthlyIncome());
        dispatch(getYearlyIncome());
        dispatch(getAllOrders());
    }, [dispatch]);

    useEffect(() => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const data = [];
        const monthlyOrderCounts = [];
        for (let index = 0; index < monthlyIncome?.length; index++) {
            const el: any = monthlyIncome[index];
            data.push({
                type: monthNames[el?._id?.month],
                income: el?.amount,
            });
            monthlyOrderCounts.push({
                type: monthNames[el?._id?.month],
                sales: el?.count,
            });
        }

        const data1: DataType[] = [];
        for (let i = 0; i < orderList?.length; i++) {
            data1.push({
                key: i,
                name: orderList[i].user.fist_name + ' ' + orderList[i].user.last_name || '',
                product: orderList[i]?.orderItems?.length,
                dPrice: orderList[i]?.dPrice,
                status: orderList[i]?.status,
            });
        }
        setDataOrders(data1);
        setDateMonthlyCount(monthlyOrderCounts);
        setDateMonthlyAmount(data);
    }, [monthlyIncome, orderList]);

    const configMonthlyAmount = {
        data: dataMonthlyAmount.length > 0 && dataMonthlyAmount,
        xField: 'type',
        yField: 'income',
        color: () => {
            return '#ffd333';
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Months',
            },
            sales: {
                alias: 'Income',
            },
        },
    };
    const configMonthlyCount = {
        data: dataMonthlyCount.length > 0 && dataMonthlyCount,
        xField: 'type',
        yField: 'sales',
        color: () => {
            return '#ffd333';
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Months',
            },
            sales: {
                alias: 'Sales',
            },
        },
    };
    return (
        <div className="pt-6 pl-4 ">
            <h1 className="title"> Dashboard</h1>
            <div className="block lg:flex justify-between my-5 gap-3">
                <div className="mb-6 lg:mb-0 px-6 py-4 bg-white rounded flex-1 ">
                    <p className="text-2xl font-semibold">Total Income:</p>
                    <div className="flex justify-between mt-5">
                        <span className="text-4xl font-semibold"> ${yearlyIncome[0]?.amount} </span>
                        <span className="text-4lg  italic pt-4">--Income in Last Year from Today--</span>
                    </div>
                </div>{' '}
                <div className="px-6 py-4 bg-white rounded  flex-1 ">
                    <p className="text-2xl font-semibold">Total Sales: </p>
                    <div className="flex justify-between mt-5">
                        <span className="text-4xl font-semibold"> {yearlyIncome[0]?.count}</span>
                        <span className="text-4lg italic pt-4">--Sales in Last Year from Today--</span>
                    </div>
                </div>{' '}
            </div>
            <div className="w-full block md:flex justify-between gap-4 my-10">
                <div className="w-full md:w-[50%] mt-3">
                    <h1 className="text-center text-3xl font-semibold mb-4">Income Statics</h1>
                    <Column {...configMonthlyAmount} className="w-full" />
                </div>
                <div className="w-full md:w-[50%] mt-3">
                    <h1 className="text-center text-3xl font-semibold mb-4">Sales Statics</h1>
                    <Column {...configMonthlyCount} className="w-full" />
                </div>
            </div>
            <div className="w-full my-10">
                <h1 className="text-left text-3xl font-semibold mb-4 mt-6">Recent Orders</h1>
                <ForwardTable className="w-100" columns={columns} dataSource={dataOrders} />
            </div>
        </div>
    );
}

export default Dashboard;
