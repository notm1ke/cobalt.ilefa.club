import { isDevelopment, isPreview } from '../util'

export interface DevElementProps {
    allowStaging?: boolean;
}

export const DevElement: React.FC<DevElementProps> = ({ allowStaging, children }) => {
    if (allowStaging && !isPreview())
        return <></>;

    if (!allowStaging && !isDevelopment())
        return <></>;

    return <>{children}</>;
}