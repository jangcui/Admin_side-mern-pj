/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },

            colors: {
                primary: '#002244',
                'light-blue': '#336699',
                'gray-blue': '#555B6E',
                gray: '#f0f0f0',
                error: '#dd551b',
                orange: '#fb923c',
                danger: '#ff2d55',
            },

            screens: {
                'min-mobile': '320px',
                'max-mobile': '470px',
                // => @media (min-width: 470px) { ... }

                sm: '471px',
                // => @media (min-width: 471px) { ... }

                md: '768px',
                // => @media (min-width: 768px) { ... }

                lg: '1024px',
                // => @media (min-width: 1024px) { ... }

                xl: '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },
        },
    },
    plugins: [],
};
