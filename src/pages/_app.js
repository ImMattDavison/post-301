import Head from 'next/head';
import '@/styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {

    const meta = {
        title: 'Post301 | Bye-Bye To High Shipping Costs!',
        description: 'Say goodbye to astronomical shipping prices and shop anywhere for one low fee with the power of Post301!',
        url: 'https://post301.tech',
        image: 'https://post301.tech/',
        type: 'website',
    };

    return (
        <UserProvider>
            <Head>
                {/* Required Meta */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Search Engine Meta */}
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />

                {/* Open Graph Meta */}
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={meta.image} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:url" content={meta.url} />

                {/* Twitter Meta */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                <meta name="twitter:url" content={meta.url} />
                
                {/* Favicon */}
                <link rel="icon" href="/brand/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </UserProvider>
    );
}