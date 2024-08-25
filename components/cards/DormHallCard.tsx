/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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