import { isPreview } from '../../util'

export const PreviewElement: React.FC = ({ children }) => {
    if (isPreview())
        return <>{children}</>;

    return <></>;
}