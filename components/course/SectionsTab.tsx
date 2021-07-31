import React from 'react';
import Link from 'next/link';
import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';
import styles from '../styling/inspection.module.css';
import Classrooms from '@ilefa/husky/classrooms.json';

import { ErrorTab } from '.';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { mdiChevronDown } from '@mdi/js';
import { SectionData } from '@ilefa/husky';
import { Collapse, UncontrolledTooltip } from 'reactstrap';
import { IDataTableColumn } from 'react-data-table-component';

import {
    BuildingCodes,
    CompleteCoursePayload,
    getCampusIndicator,
    getInstructorName,
    getMeetingRoom,
    getMeetingTime,
    getModalityIndicator,
    getRealRoomCode,
    Modalities,
    replaceAll
} from '../../util';

export interface SectionsTabProps {
    data: CompleteCoursePayload;
}

interface SectionDataProps {
    data?: SectionData;
    course: CompleteCoursePayload;
}

export const ExpandedSectionData: React.FC<SectionDataProps> = ({ data }) => {
    if (!data) return (
        <div className={styles.sectionDataExpanded}>
            <pre className={`${styles.sectionTitle} text-danger`}><i className="fa fa-times-circle fa-fw"></i> Whoops</pre>
            <p>Sorry about that, something went wrong while loading information about this section.</p>
        </div>
    )

    const [info, setInfo] = useState(true);
    const [raw, setRaw] = useState(false);
    const collapseInfo = () => setInfo(!info);
    const collapseRaw = () => setRaw(!raw);
    
    let rooms = getMeetingRoom(data.location.name).sort((a, b) => a.localeCompare(b));
    let multipleRooms = rooms.length > 1;

    let managedRoom = Classrooms.find(room => room.name === data.location.name.replace(' ', ''));

    return (
        <div className={styles.sectionDataExpanded}>
            <div className={styles.statisticList}>
                <li className={styles.statisticItem} key={uuid()}>
                    <div className={styles.statisticImage} onClick={collapseInfo}>
                        <i className="fa fa-atlas fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p onClick={collapseInfo}><b>Section Information</b></p>
                            <p>
                                <span onClick={collapseInfo}>Click to {info ? 'hide' : 'reveal'} section information.</span>
                                <Collapse isOpen={info} className={styles.statisticCollapse}>
                                    <p><b>Term:</b> {data.term}</p>
                                    <p><b>Campus:</b> {data.campus}</p>
                                    <p><b>Modality:</b> {data.mode}</p>
                                    <p><b>Instructor:</b> {data.instructor.trim().length ? getInstructorName(data.instructor) : 'Unknown'}</p>
                                    <p><b>Schedule:</b> {getMeetingTime(data.schedule, data.location)}</p>
                                    <p><b>Location:</b> {
                                        data.location.name === 'No Room Required - Online'
                                            ? 'Virtual'
                                            : multipleRooms
                                                ? rooms.map((ent, i) => {
                                                    ent = ent.replace(' ', '');
                                                    let room = Classrooms.find(room => room.name === ent);
                                                    let end = i === rooms.length - 1 ? '' : ', ';
                                                    if (!room) return <span>{ent + end}</span>
                                                    return <Link href={`/room/${ent.toUpperCase().replace(' ', '')}`}>
                                                               <a className="text-primary shine">{ent}</a>{end}
                                                           </Link>
                                                })
                                                : !!managedRoom
                                                    ? <Link href={`/room/${data.location.name.toUpperCase().replace(' ', '')}`}>
                                                            <a className="text-primary shine">{data.location.name}</a>
                                                    </Link>
                                                    : getMeetingRoom(data.location.name).join(', ')
                                    }</p>
                                    <br/>
                                    
                                    {
                                        !!data.notes && (
                                            <>
                                                <p><b>Notes:</b> {data.notes}</p>
                                                <br/>
                                            </>
                                        )
                                    }
                                    
                                    <p><b>Enrollment Information</b></p>
                                    <ul>
                                        <li><b>Current:</b> <span className={data.enrollment.full ? 'text-danger' : 'text-success'}>{data.enrollment.current}/{data.enrollment.max}</span></li>
                                        <li><b>Waitlist Spaces:</b> {data.enrollment.waitlist ?? 'Unavailable'}</li>
                                    </ul>

                                    <p><b>Internal Information</b></p>
                                    <ul>
                                        <li><b>Class Number:</b> {data.internal.classNumber}</li>
                                        <li><b>Term Code:</b> {data.internal.termCode}</li>
                                        <li><b>Session Code:</b> {data.internal.sessionCode}</li>
                                    </ul>
                                </Collapse>
                            </p>
                        </span>
                    </div>
                </li>
                <li className={styles.statisticItem} key={data.section}>
                    <div className={styles.statisticImage} onClick={collapseRaw}>
                        <i className="fa fa-file-code fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p onClick={collapseRaw}><b>Raw Data</b></p>
                            <p>
                                <span onClick={collapseRaw}>Click to {raw ? 'hide' : 'reveal'} raw data.</span>
                                <Collapse isOpen={raw} className={styles.statisticCollapse}>
                                    <pre className="text-primary">{JSON.stringify(data, null, 3)}</pre>
                                </Collapse>
                            </p>
                        </span>
                    </div>
                </li>
            </div>
        </div>
    )
}

export const SectionsTab: React.FC<SectionsTabProps> = ({ data }) => {
    const { sections } = data;

    if (!sections.length) return (
        <ErrorTab message="There aren't any sections been taught at the moment." color="text-gray" />
    )

    const columns: IDataTableColumn[] = [
        {
            name: 'Section',
            selector: 'section',
            sortable: true,
            format: (row, _i) => <>
                                    <b className={styles.campusIndicator} id={`tooltip-campusIndicator-${row.section}`}>[{getCampusIndicator(row.campus)}/{getModalityIndicator(row.mode)}]</b> {row.section}
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-campusIndicator-${row.section}`}>
                                        <b>{row.campus}</b>
                                        <br/><span className={styles.modalityTooltipType}>{row.mode}</span>
                                        <br/><span className={styles.modalityTooltipDescription}>{Modalities[getModalityIndicator(row.mode)] || ''}</span>
                                    </UncontrolledTooltip>
                                 </>,
            grow: 0.5
        },
        {
            name: 'Room',
            selector: 'location.name',
            format: (row, _i) => {
                let room: string | JSX.Element = row.location.name
                    ? row.location.name === 'No Room Required - Online'
                    ? 'None'
                    : getMeetingRoom(row.location.name)
                        .map(name => getRealRoomCode(row.location.name, row.location.name.split(' ')[0]) + ' ' + name.split(' ')[1])
                        .join(', ')
                    : 'Unknown';

                let tokens = room.split(', ');
                if (tokens.length > 1) {
                    let all = getMeetingRoom(row.location.name).sort((a, b) => a.localeCompare(b));
                    room = <>{all[0]} <span className={styles.extraRoomsIndicator}>{'+' + (all.length - 1)}</span></>;
                }

                return <>
                            <span id={`tooltip-room-${row.section}`}>{room}</span>
                            {
                                room !== 'None' && room !== 'Unknown' && (
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-room-${row.section}`}>
                                        {
                                            tokens
                                                .sort((a, b) => a.localeCompare(b))
                                                .map((token, i) => {
                                                    let code = Object.keys(BuildingCodes).find(key => token.startsWith(key));
                                                    if (!code) return <><span>{token}</span>{i !== tokens.length - 1 ? <br/> : ''}</>
                                                    return <><span className={styles.roomTooltip}>{BuildingCodes[code]} {token.split(code).map(ent => ent.trim()).join('')}</span>{i !== tokens.length - 1 ? <br/> : ''}</>;
                                                })
                                        }
                                    </UncontrolledTooltip>
                                )
                            }
                        </>
            },
            sortable: true,
            grow: 0,
        },
        {
            name: 'Professor',
            selector: 'instructor',
            format: (row, _i) => {
                let cleanName = row.instructor.trim();
                if (cleanName.length) {
                    cleanName = replaceAll(cleanName, /<br\/*>/, ' ');
                    cleanName = replaceAll(cleanName, '&nbsp;', ' ');
                    cleanName = replaceAll(cleanName, /\(\w+\)/, '')
                }

                if (!cleanName.length)
                    cleanName = 'Unknown';

                let display = <>{cleanName}</>;
                if (cleanName.split(', ').length > 1)
                    display = <>{cleanName.split(', ')[0]} <span className={styles.extraRoomsIndicator}>{'+' + (cleanName.split(', ').length - 1)}</span></>;

                return (
                    <>
                        <span id={`tooltip-prof-${row.section}`}>{display}</span>
                        {
                            row.instructor.trim() && (
                                <UncontrolledTooltip delay={0} placement="top" target={`tooltip-prof-${row.section}`}>
                                    {
                                        cleanName
                                            .split(', ')
                                            .sort((a: string, b: string) => a.localeCompare(b))
                                            .map((name: string) => <><span>{name}</span><br/></>)
                                    }
                                </UncontrolledTooltip>
                            )
                        }
                    </>
                )
            },
            sortable: true,
            grow: 0.65,
        },
        {
            name: 'Schedule',
            selector: 'schedule',
            format: (row, i) => {
                let tokens = getMeetingTime(row.schedule.trim(), sections[i].location, false, undefined, true) as string[];
                if (tokens.join('') === 'No Meeting Time' || tokens.join('') === 'Unknown')
                    return tokens;

                return <>
                    <span id={`tooltip-schedule-${row.section}`}><>{tokens[0]} {tokens.length !== 1 ? <span className={styles.extraRoomsIndicator}>{'+' + (tokens.length - 1)}</span> : <></>}</></span>
                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-schedule-${row.section}`}>
                        {
                            (getMeetingTime(row.schedule.trim(), sections[i].location, false, undefined, false) as string)
                                .split(' & ')
                                .map((time, i, arr) => <><span className={styles.roomTooltip}>{time}</span>{i !== arr.length - 1 ? <br/> : ''}</>)
                        }
                    </UncontrolledTooltip>
                </>;
            },
            sortable: true
        },
        {
            name: 'Enrollment',
            selector: 'enrollment.current',
            sortable: true,
            grow: 0,
            format: (row, _i) => <span className={row.enrollment.full ? 'text-danger' : 'text-success'}>
                                    {row.enrollment.current + '/' + row.enrollment.max} {row.enrollment.waitlist
                                        ?   <>
                                                <span className="text-primary" id={`tooltip-${row.section}`}>(+{row.enrollment.waitlist})</span>{" "}
                                                <UncontrolledTooltip delay={0} placement="top" target={`tooltip-${row.section}`}>
                                                    Waitlist Spaces: <b>{row.enrollment.waitlist}</b>
                                                </UncontrolledTooltip>
                                            </>
                                        : ''}
                                 </span>
        }
    ];

    return (
        <DataTable
            striped
            highlightOnHover
            pointerOnHover
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandedSectionData course={data} />}
            sortIcon={<MdiIcon path={mdiChevronDown}/>}
            columns={columns}
            data={sections}
        />
    );
}