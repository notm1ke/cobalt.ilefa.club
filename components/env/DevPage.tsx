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