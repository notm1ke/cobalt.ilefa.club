/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import styles from '../../styling/inspection.module.css';

import { Fragment } from 'react';
import { DataView } from '../../';
import { isMobile } from 'react-device-detect';
import { ScheduleEntry } from '@ilefa/bluesign';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { BluesignResponsePayload, useBluesign } from '../../../hooks';

import {
    CompleteRoomPayload,
    CurrentAndNextEvents,
    getCurrentAndNextEvents,
    getDateFromTime,
    getLatestTimeValue,
    getRoomStatus,
    shorten
} from '../../../util';

export interface RoomSidebarProps {
    room: CompleteRoomPayload;
}

type SidebarEntry = {
    icon: string;
    name: string;
    marginTop?: string;
    contents: SidebarEntryContents[];
}

type SidebarEntryContents = {
    key: string;
    name: string | JSX.Element;
    value: string | number | JSX.Element;
}

type CustomScheduleEntry = ScheduleEntry & {
    startDate: Date;
    endDate: Date;
}

const getColorForScheduleEntry = (entry: CustomScheduleEntry, events: CurrentAndNextEvents): 'text-dark' | 'text-success' | 'text-warning' => {
    const [current, next, available] = events;
    if (!available)
        return 'text-dark';

    if (!current || !next || !next.length)
        return 'text-dark';

    if (current && entry.event === current.event && entry.section === current.section)
        return 'text-success';

    if (next && next[0] && next[0].event === entry.event && entry.section === next[0].section)
        return 'text-warning';

    return 'text-dark';
}

const sanitizeRoomEventId = (event: string) => event.replace(/\s/g, '').replace(/[^\w\s]+/gi, '');

const getSidebarInfo = (data: CompleteRoomPayload, state: 'loaded' | 'loading' | 'error', schedule?: BluesignResponsePayload): SidebarEntry[] => {
    const events = getCurrentAndNextEvents(schedule?.entries);

    return [
        {
            icon: 'fa fa-door-open',
            name: 'Room Status',
            contents: [
                {
                    name: state !== 'loaded'
                        ? 'Loading..'
                        : getRoomStatus(data.room, schedule!.entries, true, 12),
                    key: 'status',
                    value: ''
                },
            ]
        },
        {
            icon: 'fa fa-calendar-day',
            name: 'Event Schedule',
            marginTop: '0',
            contents: state === 'loaded'
                ? schedule && schedule.entries.length
                    ? schedule
                        .entries
                        .map(entry => ({
                            ...entry,
                            startDate: getDateFromTime(entry.start),
                            endDate: getDateFromTime(entry.end)
                        }))
                        .map((entry, i) => ({
                            name: <Fragment key={i}>
                                <a href={entry.section ? `/course/${entry.event.replace(/\s/g, '')}` : '#'} className={`${getColorForScheduleEntry(entry, events)} font-weight-bold`} id={`room-event-${sanitizeRoomEventId(entry.event)}-${i}`}>{isMobile ? entry.event : shorten(entry.event, 18)}</a>
                                {
                                    !entry.section && (
                                        <UncontrolledTooltip target={`room-event-${sanitizeRoomEventId(entry.event)}-${i}`}>
                                            <b>{entry.event}</b>
                                            <br />This event will occupy {data.name} for <b>{getLatestTimeValue(entry.endDate.getTime() - entry.startDate.getTime())}</b>.
                                        </UncontrolledTooltip>
                                    )
                                }

                                {
                                    entry.section && (
                                        <UncontrolledTooltip target={`room-event-${sanitizeRoomEventId(entry.event)}-${entry.section}`}>
                                            <b>{entry.event} ({entry.section})</b>
                                            <br />Click to view information about this course.
                                        </UncontrolledTooltip>
                                    )
                                }
                            </Fragment>,
                            key: entry.event,
                            value: `${entry.start} - ${entry.end}`     
                        }))
                    : [{ name: <><b>{data.name}</b> has nothing scheduled.</>, key: 'noEvents', value: '' }]
                : state === 'loading'
                    ? [{ name: <><i className="fa fa-spinner fa-spin fa-fw font-weight-bold"></i> Loading..</>, key: 'pending', value: '' }]
                    : [{ name: <><i className="fa fa-times-circle fa-fw text-danger font-weight-bold"></i> Error loading room schedule</>, key: 'errored', value: '' }]
        },
        {
            icon: 'fa fa-users',
            name: 'Capacity',
            contents: [
                {
                    name: 'COVID-19',
                    key: 'covid',
                    value: data.capacity.covid.toLocaleString()
                },
                {
                    name: 'Regular',
                    key: 'regular',
                    value: data.capacity.full.toLocaleString()
                }
            ]
        },
        {
            icon: 'fa fa-flag',
            name: 'Amenities',
            contents: [
                {
                    name: 'Air Conditioned',
                    key: 'airConditioned',
                    value: generateAmenityBadge(data.airConditioned)
                },
                {
                    name: 'BYOD Testing',
                    key: 'byod',
                    value: generateAmenityBadge(data.byodTesting)
                }
            ]
        },
        {
            icon: 'fa fa-video',
            name: 'Conferencing',
            contents: [
                {
                    name: 'Share Content',
                    key: 'shareContent',
                    value: generateAmenityBadge(data.videoConference?.attributes.shareContent)
                },
                {
                    name: 'Instructor-facing Camera',
                    key: 'instructorCamera',
                    value: generateAmenityBadge(data.videoConference?.attributes.instructorFacingCamera)
                },
                {
                    name: 'Student-facing Camera',
                    key: 'studentCamera',
                    value: generateAmenityBadge(data.videoConference?.attributes.studentFacingCamera)
                },
                {
                    name: 'Present Media in Front',
                    key: 'presentMedia',
                    value: generateAmenityBadge(data.videoConference?.attributes.presentMediaFrontOfRoom)
                },
                {
                    name: 'Present Media in Rear',
                    key: 'presentMediaRear',
                    value: generateAmenityBadge(data.videoConference?.attributes.presentMediaBackOfRoom)
                },
                {
                    name: 'Instructor Microphone',
                    key: 'instructorMicrophone',
                    value: generateAmenityBadge(data.videoConference?.attributes.instructorMicrophone)
                },
                {
                    name: 'Student Microphone(s)',
                    key: 'studentMicrophone',
                    value: generateAmenityBadge(data.videoConference?.attributes.studentMicrophone)
                },
                {
                    name: 'Webex Capability',
                    key: 'webexCapability',
                    value: generateAmenityBadge(data.videoConference?.attributes.connectToWebex)
                },
            ]
        },
    ]
}

const generateAmenityBadge = (bool: boolean | undefined) => (
    <Badge color={bool === undefined ? 'dark' : bool ? 'success' : 'danger'} pill>
        {
            bool === undefined
                ? <i className="fa fa-question fa-fw"></i>
                : bool
                    ? <i className="fa fa-check fa-fw"></i>
                    : <i className="fa fa-times fa-fw"></i>
        }
    </Badge>
);

export const RoomSidebar: React.FC<RoomSidebarProps> = ({ room }) => {
    let name = room.name.split(room.room)[0] + ' ' + room.room;
    const [schedule, _req, loading, error] = useBluesign({ room: name });
    
    if (loading) return renderSidebar(getSidebarInfo(room, 'loading'));
    if (error) return renderSidebar(getSidebarInfo(room, 'error'));
    
    return renderSidebar(getSidebarInfo(room, 'loaded', schedule!));
}

const renderSidebar = (sidebar: SidebarEntry[]) => (
    <div className={`col-lg-3 ${styles.pr0}`}>
        <div className="card shadow border-0">
            <div className="card-body py-10">
                {
                    sidebar.map(entry => 
                        <>
                            <div key={entry.name}>
                                <pre className={`font-weight-500 mt-${entry.marginTop ? entry.marginTop : 3} mb-2 ${styles.statisticSection} text-primary`}><i className={entry.icon + " fa-fw text-primary"}></i> {entry.name}</pre>
                                {
                                    entry.contents.map(ent => <DataView key={ent.key} name={ent.name} value={ent.value} divider={!!ent.value} />)
                                }
                                <div className={styles.horizontalDivider}></div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </div>
)