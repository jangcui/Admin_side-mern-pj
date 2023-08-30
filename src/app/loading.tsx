'use client';

import { Layout, Menu } from 'antd';

const { Header, Sider } = Layout;

const Loading = () => {
    return (
        <main className="w-full after:h-screen flex justify-center items-center">
            <span className="animate-bounce  w-6 h-6">
                <button type="button" className="bg-indigo-500 ..." disabled>
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                    Processing...
                </button>
            </span>
        </main>
    );
};

export default Loading;
