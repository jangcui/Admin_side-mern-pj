'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import ForwardTable from 'antd/lib/table/Table';
import { toast } from 'react-toastify';
import { BiEdit } from 'react-icons/bi';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteDiscount, getAllDiscounts } from '~/reduxCtrl/feature/discountStage/discountService';
import { useRouter } from 'next/navigation';

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

function DiscountList() {
    const dispatch = useDispatch<AppDispatch>();

    const { discountList } = useSelector((state: RootState) => state.discountData);

    useEffect(() => {
        dispatch(getAllDiscounts());
    }, [dispatch]);

    const [discountId, setCouponId] = useState<string>('');

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
        await dispatch(deleteDiscount(id));
        hideModal();
        await dispatch(getAllDiscounts());
    };

    const data1: DataType[] = [];
    for (let i = 0; i < discountList.length; i++) {
        data1.push({
            key: i + 1,
            name: discountList[i]?.name,
            expiry: new Date(discountList[i].expiry)
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
            percentage: discountList[i].percentage + '%',
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`discount/${discountList[i]?._id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(discountList[i]._id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Discount Code List: </h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This Discount Code will be delete?'}
                    open={open}
                    onOk={() => handleDelete(discountId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default DiscountList;
