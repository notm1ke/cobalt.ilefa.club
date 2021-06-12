import Head from 'next/head';

import type { AppProps } from 'next/app';

import '../components/styling/global.css';
import '../assets/vendor/nucleo/css/nucleo.css';
import '../assets/vendor/font-awesome/css/all.min.css';
import '../assets/scss/argon-design-system-react.scss';

import '@mdi/font/css/materialdesignicons.min.css';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Cobalt</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="ILEFA Labs" />
                <meta name="theme-color" content="#353b48" />
                <meta name="description" content="something something goes here" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/icons/logo192.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;