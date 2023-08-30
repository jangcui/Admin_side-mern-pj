'use client';
import { redirect } from 'next/navigation';

import DefaultLayout from '../defaultLayout';
import { useSelector } from 'react-redux';
import { RootState } from '~/reduxCtrl/store';

function LayoutPage({ children }: { children: React.ReactNode }) {
    const { isLogin } = useSelector((state: RootState) => state.auth);
    console.log(isLogin);
    return <DefaultLayout>{isLogin ? children : redirect('/login')}</DefaultLayout>;
}

export default LayoutPage;
