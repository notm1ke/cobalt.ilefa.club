import { useLocalStorage } from '../../hooks';
import { useEffect, useState } from 'react';

export interface OneTimeViewProps {
    /**
     * The target ``localStorage`` key to check if the component
     * has been rendered before this instance.
     */
    target: string;
}

export const OneTimeView: React.FC<OneTimeViewProps> = ({ target, children }) => {
    const [rendered, setRendered] = useState(false);
    const [value, setValue] = useLocalStorage(target, true);

    useEffect(() => {
        setRendered(value);
        setValue(false);
    }, []);

    if (!rendered)
        return <></>;

    if (!value && !rendered)
        return <></>;

    return <>{children}</>;
};