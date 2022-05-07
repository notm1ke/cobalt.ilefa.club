/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { ErrorView } from '..';
import { useRouter } from 'next/router';
import { isDevelopment, isPreview } from '../../util'

export interface DevPageProps {
    allowStaging?: boolean;
    redirect?: string;
    error?: {
        title: string;
        message: string;
    }
}

export const DevPage: React.FC<DevPageProps> = ({ allowStaging, redirect, error, children }) => {
    let router = useRouter();
    if (isDevelopment() || allowStaging && isPreview())
        return <>{children}</>;

    if (redirect)
        return <>{router.push(redirect)}</>;

    return <ErrorView
        message={error?.message || 'The page you are looking for doesn\'t seem to exist.'}
        title={error?.title || 'Not Found'}
        goBack />;
}