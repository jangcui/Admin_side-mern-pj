/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    },
};
