import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { CookieConsent, getConsent } from '@/components/ui/CookieConsent';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }: AppProps) {
    const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

    useEffect(() => {
        const sync = () => setAnalyticsAllowed(getConsent().analytics);
        sync();
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail) setAnalyticsAllowed(!!detail.analytics);
            else sync();
        };
        window.addEventListener('tk:consent-changed', handler);
        return () => window.removeEventListener('tk:consent-changed', handler);
    }, []);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
                <link rel="icon"             href="/favicon.ico" />
                <link rel="icon"             href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="viewport"        content="width=device-width, initial-scale=1" />
                <meta name="theme-color"     content="#f4f3ef" />
            </Head>

            {/* Google Analytics — loads only when GA_ID is set AND user granted analytics consent */}
            {GA_ID && analyticsAllowed && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga-init" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname, anonymize_ip: true });
            `}
                    </Script>
                </>
            )}

            <Component {...pageProps} />
            <CookieConsent />
        </>
    );
}
