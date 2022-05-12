/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import moment from 'moment';
import Link from 'next/link';
import MdiIcon from '@mdi/react';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';
import inspectionStyles from '../styling/inspection.module.css';

import { mdiGoogleClassroom } from '@mdi/js';
import { ScheduleEntry } from '@ilefa/bluesign';

import {
    capitalizeFirst,
    CompleteRoomPayload,
    getDateFromTime,
    getIconForRoom,
    getLatestTimeValue,
} from '../../util';

export interface BuildingDirectoryCardProps {
    data?: CompleteRoomPayload;
    name: string;
    room: ScheduleEntry[];
}

type CustomScheduleEntry = ScheduleEntry & {
    startDate: Date;
    endDate: Date;
}

const needsEllipses = (event: string, limit: number) => event.length > limit;

const getShortenedName = ({ event }: CustomScheduleEntry, limit: number) => {
    let capitalized = capitalizeFirst(event);
    if (needsEllipses(event, limit))
        return capitalized.substring(0, limit) + '..';
    return capitalized;
}

const getRoomStatus = (name: string, schedule: ScheduleEntry[]) => {
    let events = schedule
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return current ?
                <span className="text-dark">
                    <div><span className={`${inspectionStyles.pulsatingCircle} ${styles.pulsatingCircleSpacing}`}></span></div>
                    <div className={inspectionStyles.pulsatingCircleSeparator}>
                        <b className={`text-success ${inspectionStyles.roomScheduleStatus}`}> {getShortenedName(current, 30)}</b> for next <span className="text-purple">{getLatestTimeValue(current.endDate.getTime() - Date.now())}</span>.
                    </div>
                </span>
            : next.length ?
                <span className="text-dark">
                    <b className={`text-warning ${inspectionStyles.roomScheduleStatus}`}><i className="fa fa-clock fa-fw"></i> {getShortenedName(next[0], 20)}</b> {moment(next[0].startDate).fromNow()}
                </span>
            : <span className="text-dark">
                <b className={`text-success ${inspectionStyles.roomScheduleStatus}`}><i className="fas fa-calendar-check fa-fw"></i> {name}</b> is free.
            </span>;
}

export const BuildingDirectoryCard: React.FC<BuildingDirectoryCardProps> = ({ room, name, data }) => {
    let icon = data
        ? getIconForRoom(data, '', 20)
        : <MdiIcon path={mdiGoogleClassroom} className="fa-fw" size="$20px" />;

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/room/${name.replace(/\s/g, '')}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {name}
                                </a>
                            </Link>
                        </h5>

                        <p className="text-dark">
                            {getRoomStatus(name, room)}
                        </p>
                       
                        <div className={styles.projectCardLink}>
                            <a className="btn btn-dark btn-sm text-lowercase shine">
                                <i className="fa fa-search fa-fw mr-1"></i> view schedule
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}