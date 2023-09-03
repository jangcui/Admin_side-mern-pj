'use client';

import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from './defaultLayout';
import { useEffect, useState } from 'react';

import Loading from '~/components/Loading';
import { AppDispatch, RootState } from '~/reduxCtrl/store';
import { checkCurrentAdmin } from '~/reduxCtrl/feature/auth/authService';

function LayoutPage({ children }: { children: React.ReactNode }) {
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    useEffect(() => {
        dispatch(checkCurrentAdmin())
            .then(() => setIsCheckingLogin(false))
            .catch((error: any) => {
                setIsCheckingLogin(false);
                console.error('Error checking login:', error);
            });
    }, [dispatch]);

    useEffect(() => {
        if (!isCheckingLogin) {
            if (isLogin === false) {
                redirect('/login');
            }
        }
    }, [isCheckingLogin, isLogin]);

    return <>{isLogin ? <DefaultLayout>{children}</DefaultLayout> : <Loading />}</>;
}

export default LayoutPage;
