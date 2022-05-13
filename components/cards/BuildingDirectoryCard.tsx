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

import { useState } from 'react';
import { useRoom } from '../../hooks';
import { mdiGoogleClassroom, mdiPresentationPlay } from '@mdi/js';
import { ScheduleEntry } from '@ilefa/bluesign';

import {
    capitalizeFirst,
    getDateFromTime,
    getIconForCourse,
    getIconForRoom,
    getLatestTimeValue,
} from '../../util';
import { Modal } from '../Modal';
import { BuildingCode } from '@ilefa/husky';

export interface BuildingDirectoryCardProps {
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

interface RoomScheduleModalProps {
    name: string;
    schedule: ScheduleEntry[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RoomScheduleModal: React.FC<RoomScheduleModalProps> = ({ name, schedule, open, setOpen }) => (
    <Modal
        open={open}
        setOpen={() => setOpen(false)}
        width="850px"
        title={<span><b>{BuildingCode[name.split(' ')[0].toUpperCase()]}</b> ➜ {name}</span>}>
            <span>
                <pre className={`${inspectionStyles.sectionTitle} text-primary mt-3`}><i className="fa fa-tags fa-fw"></i> Room Status</pre>
                <p className={inspectionStyles.description}>
                    {getRoomStatus(name, schedule)}
                </p>
                <pre className={`${inspectionStyles.sectionTitle} text-primary`}><i className="fa fa-stream fa-fw"></i> What's Next</pre>
                <ul className={inspectionStyles.roomSchedule}>
                    {
                        schedule.length > 0 && schedule.map(ent => (
                            <li key={`${ent.event}-${ent.section ?? 'NO_SECTION'}`}>
                                {
                                    ent.section && <span>
                                        {getIconForCourse(ent.event.replace(/\s/, ''), 'text-warp fa-fw')} <a className="text-warp font-weight-bold shine" href={`/course/${ent.event.replace(/\s/, '')}`}>{ent.event} ({ent.section})</a> from <b>{ent.start} - {ent.end}</b>
                                    </span>
                                }
        
                                {
                                    ent.independent && <span>
                                        <MdiIcon path={mdiPresentationPlay} className="text-warp fa-fw" size="16px" /> <span className="text-warp font-weight-bold">{ent.event}</span> from <b>{ent.start} - {ent.end}</b>
                                    </span>
                                }
                            </li>
                        ))
                    }
        
                    { schedule.length === 0 && <li><b>{name}</b> has nothing scheduled.</li> }
                </ul>
            </span>
    </Modal>
);

export const BuildingDirectoryCard: React.FC<BuildingDirectoryCardProps> = ({ room, name }) => {
    const [data, _url, loading, error] = useRoom({ name: name.replace(/\s/g, '') });
    const [open, setOpen] = useState(false);

    if (loading) return <></>;

    let managed = data && !error;
    let icon = managed
        ? getIconForRoom(data!, '', 20)
        : <MdiIcon path={mdiGoogleClassroom} className="fa-fw" size="$20px" />;

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div>
                    <h5>
                        <a className={`${cardStyles.cardSectionTitle} text-primary-light pointer`} onClick={() => setOpen(true)}>
                            {icon ?? ''} {name}
                        </a>
                    </h5>

                    <p className="text-dark">
                        {getRoomStatus(name, room)}
                    </p>
                    
                    <div className={styles.projectCardLink}>
                        {
                            managed && (
                                <a className="btn btn-warp btn-sm text-lowercase shine">
                                    <i className="fa fa-compass fa-fw mr-1"></i> explore
                                </a>
                            )
                        }

                        <a className="btn btn-dark btn-sm text-lowercase shine" onClick={() => setOpen(true)}>
                            <i className="fa fa-calendar-week fa-fw mr-1"></i> view schedule
                        </a>
                    </div>
                </div>
            </div>
            <RoomScheduleModal
                name={name}
                schedule={room}
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}