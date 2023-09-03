'use client';

const Loading = () => {
    return (
        <main className="w-full after:h-screen flex justify-center items-center">
            <div className="animate-spin p-6 border-[8px] border-primary border-dotted rounded-full"> </div>
        </main>
    );
};

export default Loading;
