import Link from 'next/link';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';

import {
    DiningHall,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

import {
    getDiningHallStatusColor,
    getEnumKeyByEnumValue,
    getIconForDiningHall
} from '../../util';

export interface DiningHallCardProps {
    hall: DiningHall;
}

export const DiningHallCard: React.FC<DiningHallCardProps> = ({ hall }) => {
    let icon = getIconForDiningHall(getEnumKeyByEnumValue(DiningHallType, hall.name) as keyof typeof DiningHallType, cardStyles.cardTitleIcon, 24);
    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/dining/${hall.name.toLowerCase()}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {hall.name}
                                </a>
                            </Link>
                        </h5>
    
                        <p className={`text-dark ${cardStyles.cardSectionText}`}>
                            <b>{hall.name}</b> is currently <span className={`text-${getDiningHallStatusColor(hall)}`}>{getDiningHallStatus(hall.name as DiningHallType).toLowerCase()}</span>.
                        </p>
                        
                        <div className={styles.projectCardLink}>
                            <Link href={`/dining/${hall.name.toLowerCase()}`}>
                                <a className="btn btn-dark btn-sm text-lowercase shine">
                                    <i className="fa fa-stream fa-fw"></i> menu
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}