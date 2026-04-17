import { Html, Head, Main, NextScript } from 'next/document';

const themeInit = `(function(){try{var t=localStorage.getItem('tk_theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="google-adsense-account" content="ca-pub-1948452989342011" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1948452989342011"
                    crossOrigin="anonymous"
                />
                <script dangerouslySetInnerHTML={{ __html: themeInit }} />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
