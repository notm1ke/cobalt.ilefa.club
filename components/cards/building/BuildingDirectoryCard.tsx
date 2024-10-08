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

import MdiIcon from '@mdi/react';
import styles from '../../styling/building.module.css';
import cardStyles from '../../styling/card.module.css';
import inspectionStyles from '../../styling/inspection.module.css';

import { Modal } from '../../';
import { useState } from 'react';
import { useRoom } from '../../../hooks';
import { BuildingCode } from '@ilefa/husky';
import { ScheduleEntry } from '@ilefa/bluesign';
import { mdiGoogleClassroom, mdiPresentationPlay } from '@mdi/js';
import { getIconForCourse, getIconForRoom, getRoomStatus } from '../../../util';

export interface BuildingDirectoryCardProps {
    name: string;
    room: ScheduleEntry[];
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
                    {getRoomStatus(name, schedule, false)}
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
    let cleanName = name.replace(/_/g, ' ');

    const [data, _url, loading, error] = useRoom({ name: cleanName.replace(/\s/g, '') });
    const [open, setOpen] = useState(false);

    if (loading) return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body text-center">
                <span className="text-dark">
                    <i className="fa fa-spinner fa-spin fa-fw"></i>
                </span>
            </div>
        </div>
    );

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
                            {icon ?? ''} {cleanName}
                        </a>
                    </h5>

                    <p className="text-dark">
                        {getRoomStatus(cleanName, room, true)}
                    </p>
                    
                    <div className={styles.projectCardLink}>
                        {
                            managed && (
                                <a href={`/room/${data!.name}`} className="btn btn-warp btn-sm text-lowercase shine">
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
                name={cleanName}
                schedule={room}
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}