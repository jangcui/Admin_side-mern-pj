'use client';

import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import ForwardTable from 'antd/lib/table/Table';
import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteColor, getAllColors } from '~/reduxCtrl/feature/colorStage/colorService';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    title: JSX.Element;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'title',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function ColorList() {
    const dispatch = useDispatch<AppDispatch>();
    const colorState = useSelector((state: RootState) => state.colorData.colorList);
    const [colorId, setColorId] = useState<string>('');

    const [open, setOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllColors());
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
    const handleDelete = async (id: string) => {
        await dispatch(deleteColor(id));
        hideModal();
        await dispatch(getAllColors());
    };

    const data1: DataType[] = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            // title: colorState[i].title,
            title: (
                <div className="flex gap-10">
                    <span>{colorState[i].title}</span>
                    <span className="icon rounded-full" style={{ backgroundColor: colorState[i].title }}></span>
                </div>
            ),
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`color/${colorState[i]?.id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(colorState[i].id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Color List</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This brand will be delete?'}
                    open={open}
                    onOk={() => handleDelete(colorId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default ColorList;
