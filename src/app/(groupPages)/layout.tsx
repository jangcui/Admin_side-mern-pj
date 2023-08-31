'use client';
import { redirect } from 'next/navigation';

import DefaultLayout from '../defaultLayout';
import { useSelector } from 'react-redux';
import { RootState } from '~/reduxCtrl/store';

function LayoutPage({ children }: { children: React.ReactNode }) {
    const { isLogin } = useSelector((state: RootState) => state.auth);

    const renderContent = () => {
        if (isLogin) {
            return <DefaultLayout>{children}</DefaultLayout>;
        } else {
            redirect('/login');
        }
    };

    return renderContent();
}

export default LayoutPage;
