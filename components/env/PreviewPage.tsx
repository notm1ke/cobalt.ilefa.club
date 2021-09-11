import { ErrorView } from '..';
import { isDevelopment, isPreview } from '../../util'
import { useRouter } from 'next/router';

export interface PreviewPageProps {
    allowDev?: boolean;
    redirect?: string;
    error?: {
        title: string;
        message: string;
    }
}

export const PreviewPage: React.FC<PreviewPageProps> = ({ allowDev, redirect, error, children }) => {
    let router = useRouter();
    if (allowDev && isDevelopment() || isPreview())
        return <>{children}</>;

    if (redirect)
        return <>{router.push(redirect)}</>;

    return <ErrorView
        message={error?.message || 'The page you are looking for doesn\'t seem to exist.'}
        title={error?.title || 'Not Found'}
        goBack />;
}