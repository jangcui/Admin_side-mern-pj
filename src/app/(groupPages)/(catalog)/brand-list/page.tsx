'use client';

import { toast } from 'react-toastify';
import ForwardTable from 'antd/lib/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteBrand, getAllBrands } from '~/reduxCtrl/feature/brandStage/brandService';
import { useRouter } from 'next/navigation';
interface DataType {
    key: React.Key;
    action: JSX.Element;
    title: string;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'title',
        sorter: (a: any, b: any) => a.title.length - b.title.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function BrandList() {
    const dispatch = useDispatch<AppDispatch>();
    const brandState = useSelector((state: RootState) => state.brandData.brandList);

    const [brandId, setBrandId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setBrandId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id: string) => {
        await dispatch(deleteBrand(id));
        hideModal();
        await dispatch(getAllBrands());
    };
    console.log(brandState);
    const data1: DataType[] = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            title: brandState[i]?.title,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`brand/${brandState[i]?.id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(brandState[i].id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Brand List</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This brand will be delete?'}
                    open={open}
                    onOk={() => handleDelete(brandId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default BrandList;
