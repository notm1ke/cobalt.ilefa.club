/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import moment from 'moment';
import Head from 'next/head';
import * as Logger from '../util/logger';

import { isDevelopment } from '../util';
import { LogLevel } from '../util/logger';
import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app';

import {
    BUILT_AT,
    COMMIT_AUTHOR,
    COMMIT_HASH
} from '../util/build';

import '../components/styling/global.css';
import '../assets/icons/font-awesome/css/all.min.css';
import '../assets/scss/argon-design-system-react.scss';

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
    Logger.log(LogLevel.INFO, null, `This instance of Cobalt is running version %c${COMMIT_HASH?.substring(0,7) || 'no_git_id'} (${process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'})%c`, 'color: #888;', 'color: inherit;');
    
    if (isDevelopment())
        Logger.log(LogLevel.INFO, 'Build', `Signed by: %c${COMMIT_AUTHOR}%con ${moment(parseInt(BUILT_AT) * 1000).format('MMM Do, [at] h:mm:ss A')}`, 'color: #999;', 'color: inherit;');

    return (
        <>
            <Head>
                <title>Cobalt</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="author" content="ILEFA Labs" />
                <meta name="theme-color" content="#353b48" />
                <meta name="description" content="An intelligent suite of tools built by UConn students, for UConn students." />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/icons/logo192.png" />
            </Head>
            <Component {...pageProps} />
            <Analytics />
        </>
    )
}

export default App;