'use client';
import { useDispatch, useSelector } from 'react-redux';
import ForwardTable from 'antd/lib/table/Table';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
    applyDiscount,
    getAllProducts,
    removeDiscount,
    toggleProductToTrashBin,
} from '~/reduxCtrl/feature/productStage/productService';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import ModalCustom from '~/components/ModalCustom';
import { getAllDiscounts } from '~/reduxCtrl/feature/discountStage/discountService';
import { DiscountType } from '~/reduxCtrl/feature/type';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    title: string;
    brand: string;
    category: string;
    discount: JSX.Element;
    price: JSX.Element;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a: any, b: any) => a.title.length - b.title.length,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a: any, b: any) => a.category.length - b.category.length,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a: any, b: any) => a.price - b.price,
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];
function ProductList() {
    const dispatch = useDispatch<AppDispatch>();
    const { productList } = useSelector((state: RootState) => state.productData);
    const { discountList } = useSelector((state: RootState) => state.discountData);

    const [productId, setProductId] = useState<string>('');
    const [open, setOpen] = useState(false);

    const navigate = useRouter();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllDiscounts());
    }, [dispatch]);

    const showModal = (value: string) => {
        setOpen(true);
        if (value) {
            setProductId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id: string) => {
        hideModal();
        await dispatch(toggleProductToTrashBin(id));
        await dispatch(getAllProducts());
        toast.info('Added product to trash bin!');
    };

    const handleDiscount = async (e: string, nameProduct: string) => {
        if (e === 'remove') {
            await dispatch(removeDiscount(nameProduct));
            await dispatch(getAllProducts());
        } else {
            await dispatch(applyDiscount({ discountCode: e, nameProduct: nameProduct.trim() }));
            await dispatch(getAllProducts());
        }
    };

    const data1: DataType[] = [];
    for (let i = 0; i < productList.length; i++) {
        data1.push({
            key: i + 1,
            title:
                productList[i]?.title +
                ` (-${productList[i]?.discountCode ? productList[i]?.discountCode?.percentage : 0}%)`,
            brand: productList[i]?.brand,
            category: productList[i]?.category,
            price: <> {productList[i]?.price + '$'}</>,
            discount: (
                <>
                    <select
                        name={'discountCode'}
                        className="w-full py-6 px-2 rounded-sm shadow-primary drop-shadow-lg"
                        value={productList[i]?.discountCode?.name ? productList[i]?.discountCode?.name : ''}
                        onChange={(e: any) => handleDiscount(e.target.value, productList[i]?.slug)}
                    >
                        <option value="remove">Disable</option>
                        {discountList?.map((el: DiscountType, index: number) => (
                            <option key={index} value={el.name}>
                                {el.name} (-{el.percentage}%) -- Expiry:{' '}
                                {`${new Date(el.expiry)
                                    .toLocaleString('vi-VN', {
                                        hour12: true,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })
                                    .replace(' ', ', ')}`}
                            </option>
                        ))}
                    </select>
                </>
            ),
            action: (
                <>
                    <div className="flex gap-10">
                        <button onClick={() => navigate.push(`product/${productList[i]?.slug}`)}>
                            <BiEdit className="icon text-primary" />
                        </button>

                        <button onClick={() => showModal(productList[i]?._id)}>
                            <AiFillDelete className="icon text-error" />
                        </button>
                    </div>
                </>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Product List</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>
                <ModalCustom
                    title={'This blog will be delete?'}
                    open={open}
                    onOk={() => handleDelete(productId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default ProductList;
