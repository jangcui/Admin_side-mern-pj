'use client';

import { toast } from 'react-toastify';
import ForwardTable from 'antd/lib/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { BsArrowReturnLeft } from 'react-icons/bs';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { getProductTrash } from '~/reduxCtrl/feature/trashStage/trashServer';
import { deleteProduct, toggleProductToTrashBin } from '~/reduxCtrl/feature/productStage/productService';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    category: string;
    title: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    deadline: string;
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
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
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

function ProductsTrash() {
    const dispatch = useDispatch<AppDispatch>();
    const { productTrash } = useSelector((state: RootState) => state.trashBinData);
    const [productId, setProductId] = useState<string>('');

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalReturn, setOpenModalReturn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getProductTrash());
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
        await dispatch(deleteProduct(id));
        setTimeout(() => {
            dispatch(getProductTrash());
            toast.success('Delete!');
        }, 100);
    };

    const handleRecovered = async (id?: string) => {
        if (id) {
            setOpenModalReturn(false);
            await dispatch(toggleProductToTrashBin(id));
            setTimeout(() => {
                dispatch(getProductTrash());
                toast.info('Recovered product!');
            }, 100);
        }
    };
    const data1: DataType[] = [];
    for (let i = 0; i < productTrash.length; i++) {
        const currentDate: Date = new Date();
        const deleteDate = new Date(productTrash[i]?.deleteDate);
        const deadline = Math.floor((deleteDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        data1.push({
            key: i + 1,
            title: productTrash[i].title,
            category: productTrash[i].category,
            brand: productTrash[i].brand,
            price: productTrash[i].price,
            quantity: productTrash[i].quantity,
            sold: productTrash[i].sold,
            deadline: `After ${deadline} days`,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => showModalReturn(productTrash[i]._id)}>
                        <BsArrowReturnLeft className="icon" />
                    </button>
                    <button onClick={() => showModalDelete(productTrash[i]._id)}>
                        <TiDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Products Trash</h1>
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

export default ProductsTrash;
