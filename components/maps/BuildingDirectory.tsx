/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';
import moment from 'moment';
import MdiIcon from '@mdi/react';
// import Timeline from 'react-gantt-simple-timeline';
import DataTable from 'react-data-table-component';
import Classrooms from '@ilefa/husky/classrooms.json';

import styles from '../styling/inspection.module.css';

import { ErrorTab } from '..';
import { Progress } from 'reactstrap';
import { Classroom } from '@ilefa/husky';
import { mdiChevronDown } from '@mdi/js';
import { LoaderTab } from '../inspection';
import { IDataTableColumn } from 'react-data-table-component';
import { RoomSchedule, ScheduleEntry } from '@ilefa/bluesign';
import { BuildingCodeKey, MarkerPayload, useManagedSite } from '../../hooks';

import {
    capitalizeFirst,
    getDateFromTime,
    getIconForRoom,
    getLatestTimeValue,
} from '../../util';

type RoomEntry = RoomSchedule & Partial<Omit<Classroom, 'room'>>;

export interface BuildingDirectoryProps {
    marker: MarkerPayload;
}

export interface RoomDataProps {
    data?: RoomEntry;
}

const flattenSchedules = (schedules: RoomSchedule[][]): RoomSchedule[] => Array.prototype.concat.apply([], schedules);

const createRoomEntries = (schedules: RoomSchedule[][]) =>
    flattenSchedules(schedules)
        .map(schedule => {
            if (!schedule) return { entries: [] };
            let target = Classrooms.filter(room => room.name.toLowerCase() === schedule.room.replace(/\s/g, '').toLowerCase());
            if (!target) return schedule;
            return { ...schedule, ...target };
        }) as RoomEntry[];

type CustomScheduleEntry = ScheduleEntry & {
    startDate: Date;
    endDate: Date;
}

type CurrentAndNextEvents = [CustomScheduleEntry | undefined, CustomScheduleEntry[] | undefined, boolean];

const needsEllipses = (event: string, limit: number) => event.length > limit;

const getShortenedName = ({ event }: CustomScheduleEntry, limit: number) => {
    let capitalized = capitalizeFirst(event);
    if (needsEllipses(event, limit))
        return capitalized.substring(0, limit) + '..';
    return capitalized;
}

const getRoomStatus = (room: RoomEntry) => {
    let events = room
        .entries
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return current ?
                <span className="text-dark">
                    <div><span className={styles.pulsatingCircle}></span></div>
                    <div className={styles.pulsatingCircleSeparator}>
                        <b className={`text-success ${styles.roomScheduleStatus}`}> {getShortenedName(current, 50)}</b> for next <span className="text-purple">{getLatestTimeValue(current.endDate.getTime() - Date.now())}</span>.
                    </div>
                </span>
            : next.length ?
                <span className="text-dark">
                    <b className={`text-warning ${styles.roomScheduleStatus}`}><i className="fa fa-clock fa-fw"></i> {next[0].event}</b> starts {moment(next[0].startDate).fromNow()}
                </span>
            : <span className="text-dark">
                <b className={`text-primary ${styles.roomScheduleStatus}`}><i className="fas fa-calendar-check fa-fw"></i> {room.room}</b> is free.
            </span>;
}

const getCurrentAndNextEvents = (schedule?: RoomEntry): CurrentAndNextEvents => {
    if (!schedule)
        return [undefined, undefined, false];

    let events = schedule
        .entries
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return [current, next, true];
}

const getPercentElapsed = (entry: CustomScheduleEntry) => {
    let total = entry.endDate.getTime() - entry.startDate.getTime();
    let elapsed = Date.now() - entry.startDate.getTime();
    return (elapsed / total) * 100;
}

export const BuildingDirectoryEntry: React.FC<RoomDataProps> = ({ data }) => {
    if (!data) return (
        <div className={styles.sectionDataExpanded}>
            <pre className={`${styles.sectionTitle} text-danger`}><i className="fa fa-times-circle fa-fw"></i> Whoops</pre>
            <p>Sorry about that, something went wrong while loading information about this section.</p>
        </div>
    )

    if (!data.entries.length) return (
        <div className={`${styles.sectionDataExpanded} mt-2 mb-2`}>
            <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-calendar-check fa-fw"></i> Empty Room</pre>
            <p>There are no events scheduled in <b className="text-primary">{(data as any).title}</b> today.</p>
        </div>
    )

    // const renderElement = (element) => {
    //     return (
    //         <div className={['element-wrapper', element.color].join(' ')}>
    //             <div className='time'>
    //                 {moment(element.start).format('h:mm a')} - {moment(element.end).format('h:mm a')}
    //             </div>
    //             <h3 className={styles.roomAgendaTitle}>{element.title}</h3>
    //         </div>
    //     )
    // }

    // const renderCurrentTimeLabel = (date) => moment(date).format('h:mm a');

    // const renderColHeaderItem = (col) => (
    //     <div className='col-head'>{col.title}</div>
    // )

    // const renderRowHeaderItem = _ => (<></>)

    // // noinspection JSUnusedLocalSymbols
    // const handleElementClick = (element, rowIndex, _e) => {
    //     // eslint-disable-next-line no-undef
    //     alert(`clicked to element with key "${element.key}" at row with index "${rowIndex}"`)
    // }

    // const START_DATE = new Date();
    // const END_DATE = new Date();

    // START_DATE.setTime(getDateFromTime(data?.entries[0]?.start ?? '12:00 AM').getTime())
    // END_DATE.setTime(getDateFromTime(data?.entries[data.entries.length - 1]?.end ?? '11:59 PM').getTime());

    // const DURATION = END_DATE.getTime() - START_DATE.getTime()
    // const COL_DURATION = 1000 * 60 * 30;
    // const COLS_COUNT = Math.ceil(DURATION / COL_DURATION)

    // const COLUMNS = [...Array(COLS_COUNT).keys()].map(i => {
    //     const start = new Date(START_DATE.getTime() + i * COL_DURATION)
    //     const end = new Date(START_DATE.getTime() + (i + 1) * COL_DURATION)
        
    //     return {
    //         key: `col-${i}`,
    //         title: moment(start).format('h:mm A'),
    //         start,
    //         end
    //     }
    // });

    // const ROWS = [
    //     {
    //         title: (data as any).title,
    //         key: (data as any).title,
    //         elements: data.entries.map(entry => ({
    //             key: `${entry.event}-${entry.section ?? entry.independent}`,
    //             title: entry.event,
    //             content: 'No content',
    //             start: getDateFromTime(entry.start),
    //             end: getDateFromTime(entry.end),
    //             color: 'red'
    //         }))    
    //     }
    // ];

    return (
        <div style={{ padding: 10 }}>
            {/* <Timeline
                current={new Date()}
                rows={ROWS}
                cols={COLUMNS}
                renderElement={renderElement}
                renderCurrentTimeLabel={renderCurrentTimeLabel}
                renderColHeaderItem={renderColHeaderItem}
                renderRowHeaderItem={renderRowHeaderItem}
                handleElementClick={handleElementClick}
                rowsBodyClass="rows-body"
                currentTimeOverlapClass='current-time'
                rowsHeaderClass='row-header'
                elementClass='element'
                alignElementHeight={false}
                gridColor='#CCCCCC'
            /> */}
        </div>
    )
}

export const BuildingDirectory: React.FC<BuildingDirectoryProps> = ({ marker }) => {
    const [sites, _url, loading, error] = useManagedSite({ sites: marker.classroomPrefixes! as BuildingCodeKey[] });

    if (loading) return <LoaderTab />;
    if (error) return <ErrorTab message="Something went wrong while loading the building directory." />;

    // if different terms in section data, show semester marker
    const columns: IDataTableColumn<RoomEntry>[] = [
        {
            name: 'Room',
            selector: 'title',
            sortable: true,
            format: (row, _i) => (
                <b>{getIconForRoom(row as any, 'mr-1 vaSub')} {row.room}</b>
            ),
            maxWidth: '25%',
            hide: 'sm'
        },
        {
            name: 'Status',
            selector: 'room',
            format: (row, _i) => {
                let [cur, _next, _load] = getCurrentAndNextEvents(row);
                let status = getRoomStatus(row);
                if (!cur) return status;

                return (
                    <div className="row">
                        <div className="col-md-12 mt-3 mb-2">{status}</div>
                        <div className="col-md-12" style={{ minWidth: '250px', maxWidth: '250px' }}>
                            <Progress max="100" value={Math.round(getPercentElapsed(cur))} color="primary" />
                        </div>
                    </div>
                );
            },
            sortable: true,
            sortFunction: (a, b) => {
                let [curA, _nextA, _loadA] = getCurrentAndNextEvents(a);
                let [curB, _nextB, _loadB] = getCurrentAndNextEvents(b);
                
                if (curA && !curB)
                    return -1;

                if (curB && !curA)
                    return 1;

                if (curA && curB) {
                    if (moment(curA.startDate).isBefore(curB.start))
                        return -1;

                    if (moment(curA.startDate).isAfter(curB.start))
                        return 1;
                }

                return 0;
            },
        }
    ];

    return (
        <DataTable
            striped
            highlightOnHover
            noTableHead
            pointerOnHover
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<BuildingDirectoryEntry />}
            sortIcon={<MdiIcon path={mdiChevronDown}/>}
            columns={columns}
            data={createRoomEntries(sites!.sites.map(site => site.schedules))} 
            className={styles.buildingDirectory}
        />
    );
}