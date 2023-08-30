'use client';

import { toast } from 'react-toastify';
import ForwardTable from 'antd/lib/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { BsArrowReturnLeft } from 'react-icons/bs';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { deleteUser } from '~/reduxCtrl/feature/customerStage/customerService';
import { getBlogsTrash } from '~/reduxCtrl/feature/trashStage/trashServer';
import { deleteBlog, toggleBlogToTrashBin } from '~/reduxCtrl/feature/blogState/blogService';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    title: string;
    category: string;
    numViews: number;
    likes: number;
    dislikes: number;
    author: string;
    deadline: string;
}

const columns: any = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Num View',
        dataIndex: 'numViews',
    },
    {
        title: 'Num Likes',
        dataIndex: 'deadline',
    },
    {
        title: 'Num Dislike',
        dataIndex: 'dislikes',
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

function BlogTrash() {
    const dispatch = useDispatch<AppDispatch>();
    const { blogTrash } = useSelector((state: RootState) => state.trashBinData);
    const [productId, setProductId] = useState<string>('');

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalReturn, setOpenModalReturn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getBlogsTrash());
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
        await dispatch(deleteBlog(id));
        await dispatch(getBlogsTrash());
    };

    const handleRecovered = async (id?: string) => {
        if (id) {
            setOpenModalReturn(false);
            await dispatch(toggleBlogToTrashBin(id));
            setTimeout(() => {
                dispatch(getBlogsTrash());
                toast.info('Recovered User!');
            }, 200);
        }
    };
    console.log(blogTrash);
    const data1: DataType[] = [];
    for (let i = 0; i < blogTrash.length; i++) {
        const currentDate: Date = new Date();
        const deleteDate = new Date(blogTrash[i]?.deleteDate);
        const deadline = Math.floor((deleteDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        data1.push({
            key: i + 1,
            title: blogTrash[i].title,
            category: blogTrash[i].category,
            numViews: blogTrash[i].numViews,
            likes: blogTrash[i].likes,
            dislikes: blogTrash[i].dislikes,
            author: blogTrash[i].author,
            deadline: `After ${deadline} days`,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => showModalReturn(blogTrash[i]._id)}>
                        <BsArrowReturnLeft className="icon" />
                    </button>
                    <button onClick={() => showModalDelete(blogTrash[i]._id)}>
                        <TiDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Blog Trash</h1>
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

export default BlogTrash;
