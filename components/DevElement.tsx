import { isDevelopment } from '../util'

export const DevElement = ({ children }) => {
    if (!isDevelopment())
        return <></>;

    return <>{children}</>;
}