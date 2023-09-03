'use client';
import { useRouter } from 'next/navigation';

// Error components must be Client Components

export default function Error() {
    const navigate = useRouter();

    return (
        <main className="w-full after:h-screen flex justify-center ">
            <div className="mt-40">
                <h2 className="text-danger text-7xl font-bold">Something went wrong!</h2>
                <p>
                    <button
                        onClick={() => navigate.refresh()}
                        className="px-6 py-3 bg-white rounded-lg text-danger flex items-center gap-5 hover:bg-light-blue"
                    >
                        <span>Reload</span>
                    </button>
                </p>
            </div>
        </main>
    );
}
