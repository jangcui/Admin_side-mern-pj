'use client';

const Loading = () => {
    return (
        <main className="w-full after:h-screen flex justify-center items-center">
            <div className="animate-bounce">
                <div className="animate-pulse">
                    <div className="p-8 border-8 rounded-full border-primary animate-spin border-dotted"></div>
                </div>
            </div>
        </main>
    );
};

export default Loading;
