'use client';

import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

const NotFound = () => {
    const navigate = useRouter();
    return (
        <main className="w-full after:h-screen flex justify-center">
            <div className="mt-40">
                <h1 className="text-7xl font-bold">Page Not Found</h1>
                <p className="mt-12">
                    <button
                        onClick={() => navigate.back()}
                        className="px-6 py-3 bg-primary rounded-lg text-white flex items-center gap-5 hover:bg-light-blue"
                    >
                        <BiArrowBack />
                        <span>Back to home</span>
                    </button>
                </p>
            </div>
        </main>
    );
};

export default NotFound;
