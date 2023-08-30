'use client';
import { useDispatch, useSelector } from 'react-redux';
import ForwardTable from 'antd/lib/table/Table';
import { AiFillDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteProdCate, getAllProdCates } from '~/reduxCtrl/feature/prodCateStage/prodCateService';

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

function Categories() {
    const dispatch = useDispatch<AppDispatch>();
    const prodCateState = useSelector((state: RootState) => state.prodCateData.prodCateList);
    const [blogCateId, setColorId] = useState<string>('');

    const [open, setOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllProdCates());
    }, [dispatch]);
    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setColorId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id?: string) => {
        hideModal();
        await dispatch(deleteProdCate(id));
        await dispatch(getAllProdCates());
    };
    const data1: DataType[] = [];
    for (let i = 0; i < prodCateState.length; i++) {
        data1.push({
            key: i + 1,
            title: prodCateState[i]?.title,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`category/${prodCateState[i]?.id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(prodCateState[i].id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Category List</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This category will be delete?'}
                    open={open}
                    onOk={() => handleDelete(blogCateId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default Categories;
