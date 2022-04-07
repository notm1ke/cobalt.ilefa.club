import { useBluefit } from '../../../hooks'
import { cloneElement, ReactElement } from 'react';

export interface RecOccupancyProviderProps {
    pollTime: number;
    children: ReactElement[];
}

export const RecOccupancyProvider: React.FC<RecOccupancyProviderProps> = ({ pollTime, children }) => {
    const [occupancy, _req, loading, error] = useBluefit(pollTime, 'occupants');
    return <>{children.map(child => cloneElement(child, { ...child.props, data: loading || error ? -1 : occupancy!.occupants }))}</>;
}