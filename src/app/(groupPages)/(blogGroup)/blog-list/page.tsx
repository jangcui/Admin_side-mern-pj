'use client';

import ForwardTable from 'antd/lib/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { BiEdit } from 'react-icons/bi';

import ModalCustom from '~/components/ModalCustom';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { useRouter } from 'next/navigation';
import { getAllBlogs, toggleBlogToTrashBin } from '~/reduxCtrl/feature/blogState/blogService';

interface DataType {
    key: React.Key;
    action: JSX.Element;
    title: string;
    category: string;
    numView: number;
    like: number;
    author: string;
    dislike: number;
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
        title: 'Author',
        dataIndex: 'author',
    },
    {
        title: 'View',
        dataIndex: 'numView',
    },
    {
        title: 'Like',
        dataIndex: 'like',
    },
    {
        title: 'Dislike',
        dataIndex: 'dislike',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

function BlogsList() {
    const dispatch = useDispatch<AppDispatch>();

    const { blogList } = useSelector((state: RootState) => state.blogData);

    const [blogId, setBlogId] = useState<string>('');
    const [open, setOpen] = useState(false);

    const navigate = useRouter();

    const showModal = (value?: string) => {
        setOpen(true);
        if (value) {
            setBlogId(value);
        }
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleDelete = async (id: string) => {
        hideModal();
        await dispatch(toggleBlogToTrashBin(id));
        await dispatch(getAllBlogs());
        toast.info('Deleted!');
    };
    ////////////////////////////
    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    const data1: DataType[] = [];
    for (let i = 0; i < blogList.length; i++) {
        data1.push({
            key: i + 1,
            title: blogList[i].title,
            category: blogList[i].category,
            numView: blogList[i].numView,
            like: blogList[i].like,
            author: blogList[i].author,
            dislike: blogList[i].dislike,
            action: (
                <div className="flex gap-10">
                    <button onClick={() => navigate.push(`blog/${blogList[i]?._id}`)}>
                        <BiEdit className="icon" />
                    </button>
                    <button onClick={() => showModal(blogList[i]._id)}>
                        <AiFillDelete className="icon text-error" />
                    </button>
                </div>
            ),
        });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Blogs List</h1>
            <div className="chart">
                <div className="content">
                    <ForwardTable columns={columns} dataSource={data1} />
                </div>{' '}
                <ModalCustom
                    title={'This blog will be delete?'}
                    open={open}
                    onOk={() => handleDelete(blogId)}
                    onCancel={hideModal}
                />
            </div>
        </div>
    );
}

export default BlogsList;
