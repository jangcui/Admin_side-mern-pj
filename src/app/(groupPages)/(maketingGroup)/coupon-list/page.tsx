'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import ForwardTable from 'antd/lib/table/Table';
import { BiEdit } from 'react-icons/bi';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { useRouter } from 'next/navigation';
import { deleteCoupon, getAllCoupons } from '~/reduxCtrl/feature/couponStage/couponServer';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    name?: string;
    expiry: string;
    percentage: string;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Code',
        dataIndex: 'name',
    },
    {
        title: 'Percentage',
        dataIndex: 'percentage',
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
    },

    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function CouponList() {
    const dispatch = useDispatch<AppDispatch>();

    const { couponList } = useSelector((state: RootState) => state.couponData);

    useEffect(() => {
        dispatch(getAllCoupons());
    }, [dispatch]);

    const [couponId, setCouponId] = useState<string>('');

    const [open, setOpen] = useState(false);

    const navigate = useRouter();

    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setCouponId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteCoupon(id));
        hideModal();
        await dispatch(getAllCoupons());
    };

    const data1: DataType[] = [];
    for (let i = 0; i < couponList.length; i++) {
        data1.push({
            key: i + 1,
            name: couponList[i]?.name,
            expiry: new Date(couponList[i].expiry)
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
            percentage: couponList[i].percentage + '%',
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`coupon/${couponList[i]?._id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(couponList[i]._id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Coupon Code List: </h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This Coupon Code will be delete?'}
                    open={open}
                    onOk={() => handleDelete(couponId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default CouponList;
