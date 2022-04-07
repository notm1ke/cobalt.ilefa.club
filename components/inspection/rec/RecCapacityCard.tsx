import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { useLocalStorage } from '../../../hooks';
import { MAXIMUM_CAPACITY } from '@ilefa/bluefit';
import { mdiHumanCapacityIncrease } from '@mdi/js';

export interface RecCapacityCardProps {
    data?: number;
}

export const RecCapacityCard: React.FC<RecCapacityCardProps> = ({ data }) => {
    const [value, _] = useLocalStorage('rec-capacity', data);
    return (
        <div className="card shadow shadow-lg--hover mt-3 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>capacity percent</div>
                        <span className={`h2 font-weight-bold mb-0 ${styles.cardText}`}>
                            {data === -1 ? `${((value! / MAXIMUM_CAPACITY) * 100).toFixed(2)}%` : `${((data! / MAXIMUM_CAPACITY) * 100).toFixed(2)}%`}
                        </span>
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiHumanCapacityIncrease} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}