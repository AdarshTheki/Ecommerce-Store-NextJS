import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontSize: {
            'heading1-bold': [
                '50px',
                {
                    lineHeight: '100%',
                    fontWeight: '700',
                },
            ],
            'heading2-bold': [
                '30px',
                {
                    lineHeight: '100%',
                    fontWeight: '700',
                },
            ],
            'heading3-bold': [
                '24px',
                {
                    lineHeight: '100%',
                    fontWeight: '700',
                },
            ],
            'heading4-bold': [
                '20px',
                {
                    lineHeight: '100%',
                    fontWeight: '700',
                },
            ],
            'body-bold': [
                '18px',
                {
                    lineHeight: '100%',
                    fontWeight: '700',
                },
            ],
            'body-semibold': [
                '18px',
                {
                    lineHeight: '100%',
                    fontWeight: '600',
                },
            ],
            'body-medium': [
                '18px',
                {
                    lineHeight: '100%',
                    fontWeight: '500',
                },
            ],
            'base-bold': [
                '16px',
                {
                    lineHeight: '100%',
                    fontWeight: '600',
                },
            ],
            'base-medium': [
                '16px',
                {
                    lineHeight: '100%',
                    fontWeight: '500',
                },
            ],
            'small-bold': [
                '14px',
                {
                    lineHeight: '140%',
                    fontWeight: '700',
                },
            ],
            'small-medium': [
                '14px',
                {
                    lineHeight: '140%',
                    fontWeight: '500',
                },
            ],
        },
        extend: {
            colors: {
                'white-1': '#F8F8F8',
                'grey-1': '#222831',
                'grey-2': '#31363F',
                'grey-3': '#B5C0D0',
                'blue-1': '#435BFF',
                'blue-2': '#F3ECFF',
                'blue-3': '#F5F7F9',
                'red-1': '#FF4898',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
