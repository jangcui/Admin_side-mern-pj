'use client';
import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from 'src/reduxCtrl/provider';
import ToastProvider from './toastNotify';
import { Metadata } from 'next';

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
