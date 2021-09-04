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