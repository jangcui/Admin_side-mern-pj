'use client';

import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    AiOutlineBgColors,
    AiOutlineDashboard,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiCategory, BiCategoryAlt, BiColorFill, BiLogOutCircle, BiStoreAlt } from 'react-icons/bi';
import { FaBlog, FaBlogger, FaClipboardList, FaListAlt, FaTrashAlt } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { MdDiscount, MdOutlineDiscount } from 'react-icons/md';
import { RiCoupon2Line, RiCoupon3Line, RiCoupon4Fill, RiProductHuntLine } from 'react-icons/ri';
import { SiBlogger, SiBrandfolder, SiProducthunt } from 'react-icons/si';
import { TbBrandShopee } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

import ModalCustom from '~/components/ModalCustom';
import { logout } from '~/reduxCtrl/feature/auth/authService';
import { AppDispatch, RootState } from '~/reduxCtrl/store';

const { Header, Sider, Content } = Layout;

const menuItems = [
    {
        key: '/dashboard',
        icon: <AiOutlineDashboard className="icon" />,
        label: 'Dashboard',
    },
    {
        key: '/customer',
        icon: <FiUsers className="icon" />,
        label: 'Customers',
    },
    {
        key: '/catalog',
        icon: <AiOutlineShoppingCart className="icon" />,
        label: 'Catalog ',
        children: [
            {
                key: '/product',
                icon: <RiProductHuntLine className="icon" />,
                label: 'Add Product',
            },
            {
                key: '/product-list',
                icon: <SiProducthunt className="icon" />,
                label: 'Product List',
            },
            {
                key: '/brand',
                icon: <SiBrandfolder className="icon" />,
                label: 'Brand',
            },
            {
                key: '/brand-list',
                icon: <TbBrandShopee className="icon" />,
                label: 'Brand List ',
            },
            {
                key: '/category',
                icon: <BiCategoryAlt className="icon" />,
                label: 'Category',
            },
            {
                key: '/category-list',
                icon: <BiCategory className="icon" />,
                label: 'Category List',
            },
            {
                key: '/color',
                icon: <BiColorFill className="icon" />,
                label: 'Color',
            },
            {
                key: '/color-list',
                icon: <AiOutlineBgColors className="icon" />,
                label: 'Color List',
            },
        ],
    },
    {
        key: '/order-list',
        icon: <FaClipboardList className="icon" />,
        label: 'Orders',
    },
    {
        key: 'blogs',
        icon: <FaBlogger className="icon" />,
        label: 'Blogs',
        children: [
            {
                key: '/blog',
                icon: <FaBlog className="icon" />,
                label: 'Add Blog',
            },
            {
                key: '/blog-list',
                icon: <FaBlog className="icon" />,
                label: 'Blog List',
            },
            {
                key: '/blog-category',
                icon: <SiBlogger className="icon" />,
                label: 'Add Blog Category',
            },
            {
                key: '/blog-category-list',
                icon: <SiBlogger className="icon" />,
                label: 'Blog Category List',
            },
        ],
    },
    {
        key: 'marketing',
        icon: <RiCoupon2Line className="icon" />,
        label: 'Marketing',
        children: [
            {
                key: '/coupon',
                icon: <RiCoupon4Fill className="icon" />,
                label: 'Create new Coupon',
            },
            {
                key: '/coupon-list',
                icon: <RiCoupon3Line className="icon" />,
                label: 'Coupon List',
            },
            {
                key: '/discount',
                icon: <MdOutlineDiscount className="icon" />,
                label: 'Create new Discount',
            },
            {
                key: '/discount-list',
                icon: <MdDiscount className="icon" />,
                label: 'Discount List',
            },
        ],
    },
    {
        key: 'trash',
        icon: <FaTrashAlt className="icon" />,
        label: 'Trash',
        children: [
            {
                key: '/trash/product',
                icon: <SiProducthunt className="icon" />,
                label: 'Product Trash',
            },
            {
                key: '/trash/blog',
                icon: <FaBlog className="icon" />,
                label: 'Blog Trash',
            },
            {
                key: '/trash/customer',
                icon: <FiUsers className="icon" />,
                label: 'Customer Trash',
            },
        ],
    },
    {
        key: '/enquiry',
        icon: <FaListAlt className="icon" />,
        label: 'Enquiry',
    },
    {
        key: 'log_out',
        icon: <BiLogOutCircle className="icon" />,
        label: 'Log out',
    },
];

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { admin } = useSelector((state: RootState) => state.auth);
    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useRouter();
    const pathName = usePathname();
    const handleLogOut = () => {
        dispatch(logout());
    };

    return (
        <main>
            <Layout className="bg-gray">
                <Sider trigger={null} collapsible collapsed={collapsed} className="">
                    <div className="h-[64px] flex justify-center items-center bg-gray rounded">
                        <h2 className="text-center font-bold text-3xl text-primary">
                            {!collapsed && <span>Admin </span>} Panel
                        </h2>{' '}
                        <ModalCustom
                            title={'Log Out'}
                            open={openModal}
                            onOk={handleLogOut}
                            onCancel={() => setOpenModal(false)}
                        />
                    </div>

                    <Menu
                        theme="dark"
                        className="menu bg-primary text-gray h-[calc(100%-64px)]"
                        mode="inline"
                        defaultSelectedKeys={[pathName || '/']}
                        onClick={({ key }) => {
                            if (key === 'log_out') {
                                setOpenModal(true);
                            } else {
                                navigate.push(key);
                            }
                        }}
                        items={menuItems}
                    />
                </Sider>

                <Layout className="flex-1">
                    <Header className="bg-primary w-100 px-0 h-[64px]  text-white flex justify-between items-center">
                        <button className="ps-3 text-white" onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? (
                                <AiOutlineMenuUnfold className="icon" />
                            ) : (
                                <AiOutlineMenuFold className="icon" />
                            )}
                        </button>
                        <h2 className="text-center font-semibold text-4xl hidden max-mobile:block">Well Come!!</h2>
                        <div className="flex pe-6 gap-x-10 items-center">
                            <a className="text-2xl text-center" href="https://xpj-commerce.vercel.app/" target="_blank">
                                <p className="flex justify-center">
                                    <BiStoreAlt className="icon" />
                                </p>
                                <p className="text-center">Go To Store</p>
                            </a>
                            <div className="text-2xl">
                                <p className="font-bold text-orange">
                                    {admin && `${admin.first_name} ${admin.last_name}`}
                                </p>
                                <a href="mailto:tungphan12h@gmail.com">{admin && admin.email}</a>
                            </div>
                        </div>
                    </Header>
                    <Content className="min-h-screen text-2xl pt-5 px-5 mt-4 ml-6">{children}</Content>
                </Layout>
            </Layout>
        </main>
    );
};

export default DefaultLayout;
