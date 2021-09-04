import { isDevelopment, isPreview } from '../../util'

export interface DevElementProps {
    allowStaging?: boolean;
}

export const DevElement: React.FC<DevElementProps> = ({ allowStaging, children }) => {
    if (isDevelopment() || allowStaging && isPreview())
        return <>{children}</>;

    return <></>;
}