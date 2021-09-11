import Link from 'next/link';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';

import {
    Dorm,
    DormHallType,
    evaluateDormKeyToToken,
    getIconForResHall,
    intToWords
} from '../../util';

export interface DormHallCardProps {
    dorm: Dorm;
}

export const DormHallCard: React.FC<DormHallCardProps> = ({ dorm }) => {
    let icon = getIconForResHall(dorm.hall, cardStyles.cardTitleIcon, 22);
    let token = evaluateDormKeyToToken(dorm.hall);
    let name = DormHallType[dorm.hall]
        .split(' Campus')[0]
        .split(' Suites')[0];

    let sources = dorm
        .sources
        .filter((source, i, arr) => arr
            .map(s => s.author.id)
            .indexOf(source.author.id) === i);

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/dorms/${token}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {name}
                                </a>
                            </Link>
                        </h5>

                        <p className={`text-dark ${cardStyles.cardSectionText}`}>
                            <b>{name}</b> has {intToWords(dorm.assets.length)} images from {intToWords(sources.length)} source{sources.length === 1 ? '' : 's'}.
                        </p>
                        
                        <div className={styles.projectCardLink}>
                            <Link href={`/dorms/${token}`}>
                                <a className="btn btn-dark btn-sm text-lowercase shine">
                                    <i className="fa fa-search fa-fw"></i> info
                                </a>
                            </Link>
                            <a className="btn btn-dark btn-sm text-lowercase shine">
                                <i className="fas fa-map-marked fa-fw mr-1"></i> maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}