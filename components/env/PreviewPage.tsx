import { ErrorView } from '..';
import { isPreview } from '../../util'
import { useRouter } from 'next/router';

export interface PreviewPageProps {
    redirect?: string;
    error?: {
        title: string;
        message: string;
    }
}

export const PreviewPage: React.FC<PreviewPageProps> = ({ redirect, error, children }) => {
    let router = useRouter();
    if (isPreview())
        return <>{children}</>;

    if (redirect)
        return <>{router.push(redirect)}</>;

    return <ErrorView
        message={error?.message || 'The page you are looking for doesn\'t seem to exist.'}
        title={error?.title || 'Not Found'}
        goBack />;
}