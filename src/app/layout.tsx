'use client';

import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from './toastNotify';
import ReduxProvider from '~/reduxCtrl/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" sizes="any" />
            </head>
            <body className="w-full h-full">
                <ToastProvider>
                    <ReduxProvider>{children}</ReduxProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
