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

import React from 'react';
import moment from 'moment';
import MdiIcon from '@mdi/react';
import styles from '../../styling/inspection.module.css';

import { mdiTicket } from '@mdi/js';
import { ErrorTab, LoaderTab } from '..';
import { RoomInspectionPayload, useBluesign } from '../../../hooks';
import { getDateFromTime, getIconForCourse, getLatestTimeValue } from '../../../util';

export interface RoomScheduleTabProps {
    room: RoomInspectionPayload;
}

export const RoomScheduleTab: React.FC<RoomScheduleTabProps> = ({ room }) => {
    let name = room.name.split(room.room)[0] + ' ' + room.room;
    let [data, _req, loading, error] = useBluesign({ room: name });

    if (loading) return <LoaderTab />;
    if (error || !data)
        return <ErrorTab />;
       
    let events = data
        .entries
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return (
        <div className={styles.tabBody}>
            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-tags fa-fw"></i> Room Status</pre>
            <p className={styles.description}>
                {
                    current ?
                        <span className="text-dark">
                            <div><span className={styles.pulsatingCircle}></span></div>
                            <div className={styles.pulsatingCircleSeparator}>
                                <b className={`text-success ${styles.roomScheduleStatus}`}> Happening Now:</b> {current.event} for the next <span className="text-purple">{getLatestTimeValue(current.endDate.getTime() - Date.now())}</span>.
                            </div>
                        </span>
                    : next.length ?
                        <span className="text-dark">
                            <b className={`text-purple ${styles.roomScheduleStatus}`}><i className="fa fa-clock fa-fw"></i> Upcoming:</b> {next[0].event} {moment(next[0].startDate).fromNow()}
                        </span>
                    : <span className="text-dark">
                          <b className={`text-success ${styles.roomScheduleStatus}`}> No Events:</b> {room.name} is not designated to have any events.
                      </span>
                }
            </p>
            <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-stream fa-fw"></i> What's next</pre>
            <ul className={styles.roomSchedule}>
                {
                    events.length && events.map(ent => (
                        <li key={`${ent.event}-${ent.section ?? 'NO_SECTION'}`}>
                            {
                                ent.section && <span>
                                    {getIconForCourse(ent.event.replace(/\s/, ''), 'text-warp fa-fw')} <a className="text-warp font-weight-bold shine" href={`/course/${ent.event.replace(/\s/, '')}`}>{ent.event} ({ent.section})</a> from <b>{ent.start} - {ent.end}</b>
                                </span>
                            }

                            {
                                ent.independent && <span>
                                    <MdiIcon path={mdiTicket} className="text-warp fa-fw" size="16px" /> <span className="text-warp font-weight-bold">{ent.event}</span> from <b>{ent.start} - {ent.end}</b>
                                </span>
                            }
                        </li>
                    ))
                }
                {
                    events.length === 0 && <li>There are no events scheduled for <b>{room.name}</b>.</li>
                }
            </ul>
            
            <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-file-alt fa-fw"></i> Raw Data</pre>
            <pre className="text-primary">{JSON.stringify(data, null, 3)}</pre>
        </div>
    )
}