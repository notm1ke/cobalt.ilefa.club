import { isPreview, isProd } from '../../util'

export interface ProdElementProps {
    allowStaging?: boolean;
}

export const ProdElement: React.FC<ProdElementProps> = ({ allowStaging, children }) => {
    if (isProd() || allowStaging && isPreview())
        return <>{children}</>;

    return <></>;
}