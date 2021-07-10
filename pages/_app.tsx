import Head from 'next/head';
import * as Logger from '../util/logger';

import type { AppProps } from 'next/app';
import { LogLevel } from '../util/logger';

import '../components/styling/global.css';
import '../assets/vendor/nucleo/css/nucleo.css';
import '../assets/vendor/font-awesome/css/all.min.css';
import '../assets/scss/argon-design-system-react.scss';

import '@mdi/font/css/materialdesignicons.min.css';

const WATERMARK = `%c
    ___                      
 __/_  \`.  .-"""-.        ___     _          _ _   
 \\_,\` | \\-'  /   )\`-')   / __|___| |__  __ _| | |_ 
  "") \`"\`    \  ((\`"\`    | (__/ _ \\ '_ \\\/ _\` | |  _|
 ___Y  ,    .'7 /|       \\___\\___/_.__/\\__,_|_|\\__|
(_,___/...-\` (_/_/    

`

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    Logger.clear();
    Logger.raw(WATERMARK, 'color: #487eb0; font-weight: 600;');
    Logger.log(LogLevel.INFO, null, `This instance of Cobalt is running version %c${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0,7) || 'no_git_id'} (${process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'})%c`, 'color: #888;', 'color: inherit;');

    return (
        <>
            <Head>
                <title>Cobalt</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="ILEFA Labs" />
                <meta name="theme-color" content="#353b48" />
                <meta name="description" content="A suite of better course tools built by UConn students, for UConn students." />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/icons/logo192.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;