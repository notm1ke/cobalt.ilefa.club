import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { useEffect } from 'react';
import { mdiAccountSupervisor } from '@mdi/js';
import { useLocalStorage } from '../../../hooks';

export interface RecOccupancyCardProps {
    data?: number;
}

export const RecOccupancyCard: React.FC<RecOccupancyCardProps> = ({ data }) => {
    const [value, setValue] = useLocalStorage('rec-occupancy', data);
    useEffect(() => () => {
        if (data !== -1)
            setValue(data);
    }, []);

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>realtime occupants</div>
                        <span className={`h2 font-weight-bold mb-0 ${styles.cardText}`}>
                            {(data && data === -1) ? value : data!.toLocaleString()}
                        </span>
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiAccountSupervisor} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}