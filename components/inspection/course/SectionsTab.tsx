import React from 'react';
import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';
import Classrooms from '@ilefa/husky/classrooms.json';

import styles from '../../styling/inspection.module.css';

import { ErrorTab } from '.';
import { CopyButton } from '../..';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useToggle } from '../../../hooks';
import { mdiChevronDown } from '@mdi/js';
import { ROOM_REGEX_PATTERN } from '@ilefa/bluesign';
import { Collapse, UncontrolledTooltip } from 'reactstrap';
import { IDataTableColumn } from 'react-data-table-component';
import { BuildingCode, Classroom, SectionData } from '@ilefa/husky';

import {
    CompleteCoursePayload,
    getCampusIndicator,
    getIconForRoom,
    getInstructorName,
    getMeetingRoom,
    getMeetingTime,
    getModalityIndicator,
    getRealRoomCode,
    Modalities,
    replaceAll
} from '../../../util';

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

    const [info, toggleInfo] = useToggle(true);
    const [raw, toggleRaw] = useToggle(false);
    const [classNumCopied, setClassNumCopied] = useState(false);
    const [classTermCopied, setTermCopied] = useState(false);
    const [classSessionCopied, setSessionCopied] = useState(false);

    let rooms = getMeetingRoom(data.location.name).sort((a, b) => a.localeCompare(b));
    let multipleRooms = rooms.length > 1;

    let honors = data.notes && data.notes.toLowerCase().includes('honors');
    let managedRoom = Classrooms.find(room => room.name === data.location.name.replace(' ', ''));

    return (
        <div className={styles.sectionDataExpanded}>
            <div className={styles.statisticList}>
                <li className={styles.statisticItem} key={uuid()}>
                    <div className={styles.statisticImage} onClick={toggleInfo}>
                        <i className="fa fa-atlas fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p onClick={toggleInfo}><b>Section Information</b></p>
                            <p>
                                <span onClick={toggleInfo}>Click to {info ? 'hide' : 'reveal'} section information.</span>
                                <Collapse isOpen={info} className={styles.statisticCollapse}>
                                    <p><b>Section:</b> {data.section}</p>
                                    <p><b>Term:</b> {data.term}</p>
                                    <p><b>Campus:</b> {data.campus}</p>
                                    <p><b>Modality:</b> {data.mode}</p>
                                    <p><b>Instructor:</b> {data.instructor.trim().length ? getInstructorName(data.instructor) : 'Unknown'}</p>
                                    <p><b>Schedule:</b> {getMeetingTime(data.schedule, data.location)}</p>
                                    <p><b>Location:</b> {
                                        !data.location.name.trim().length
                                            ? 'Unknown'
                                            : data.location.name === 'No Room Required - Online'
                                                ? 'Virtual'
                                                : multipleRooms
                                                    ? rooms
                                                        .filter(room => ROOM_REGEX_PATTERN.test(room))
                                                        .map((ent, i, arr) => {
                                                            ent = ent.replace(' ', '');
                                                            let room = Classrooms.find(room => room.name === ent);
                                                            let end = i === arr.length - 1 ? '' : ', ';
                                                            if (!room) return <span>{ent + end}</span>
                                                            
                                                            return <a href={`/room/${ent.toUpperCase().replace(' ', '')}`}>
                                                                    <>{getIconForRoom(room as Classroom, 'text-primary')} <a className="text-primary shine">{ent}</a>{end}</>
                                                                </a>
                                                        })
                                                    : !!managedRoom
                                                        ? <a href={`/room/${data.location.name.toUpperCase().replace(' ', '')}`}>
                                                            <>{getIconForRoom(managedRoom as Classroom, 'text-primary')} <a className="text-primary shine">{data.location.name}</a></>
                                                        </a>
                                                        : getMeetingRoom(data.location.name).join(', ')
                                    }</p>
                                    <br/>
                                    
                                    {
                                        honors && (
                                            <>
                                                <pre className={`${styles.honorsWarning} text-danger mt-3`}><i className="fa fa-medal fa-fw"></i> Enrollment Notification</pre>
                                                <p className={styles.honorsDescription}>This section is marked as an honors section.</p>
                                            </>
                                        )
                                    }

                                    {
                                        !honors && !!data.notes && (
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
                                        <li><b>Class Number:</b> <CopyButton className={(classNumCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.classNumber} onCopied={() => setClassNumCopied(true)} onCopyRecharged={() => setClassNumCopied(false)}>{data.internal.classNumber}</CopyButton></li>
                                        <li><b>Term Code:</b> <CopyButton className={(classTermCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.termCode} onCopied={() => setTermCopied(true)} onCopyRecharged={() => setTermCopied(false)}>{data.internal.termCode}</CopyButton></li>
                                        <li><b>Session Code:</b> <CopyButton className={(classSessionCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.sessionCode} onCopied={() => setSessionCopied(true)} onCopyRecharged={() => setSessionCopied(false)}>{data.internal.sessionCode}</CopyButton></li>
                                    </ul>

                                    {/* <br />
                                    <span className="btn btn-link btn-success btn-sm text-white">I'm taking this section</span> */}
                                </Collapse>
                            </p>
                        </span>
                    </div>
                </li>
                <li className={styles.statisticItem} key={data.section}>
                    <div className={styles.statisticImage} onClick={toggleRaw}>
                        <i className="fa fa-file-code fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p onClick={toggleRaw}><b>Raw Data</b></p>
                            <p>
                                <span onClick={toggleRaw}>Click to {raw ? 'hide' : 'reveal'} raw data.</span>
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

    if (!sections.length)
        return <ErrorTab
            message="There aren't any sections been taught at the moment."
            color="text-gray" />

    // if different terms in section data, show semester marker
    let useTerm = sections.some(section => section.term !== sections[0].term);
    const columns: IDataTableColumn[] = [
        {
            name: 'Section',
            selector: 'section',
            sortable: true,
            format: (row, _i) => <>
                                    <b className={styles.campusIndicator} id={`tooltip-campusIndicator-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        [{getCampusIndicator(row.campus)}/{getModalityIndicator(row.mode) + (useTerm ? `/${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}` : '')}]
                                    </b> {row.section}
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-campusIndicator-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        <b>{row.campus}{useTerm ? ` - ${row.term}` : ''}</b>
                                        <br/><span className={styles.modalityTooltipType}>{row.mode}</span>
                                        <br/><span className={styles.modalityTooltipDescription}>{Modalities[getModalityIndicator(row.mode)] || ''}</span>
                                    </UncontrolledTooltip>
                                 </>,
            grow: useTerm ? 0.75 : 0.5
        },
        {
            name: 'Room',
            selector: 'location.name',
            format: (row, _i) => {
                let room: string | JSX.Element = !!row.location.name
                    ? row.location.name === 'No Room Required - Online'
                        ? 'None'
                        : getMeetingRoom(row.location.name)
                            .filter(room => ROOM_REGEX_PATTERN.test(room))
                            .map(token => !token.includes(' ') ? token.split(/\d/).join(' ') : token)
                            .map(name => getRealRoomCode(row.location.name, row.location.name.split(' ')[0]) + ' ' + name.split(' ')[1])
                            .join(', ')
                    : 'Unknown';

                let tokens = room.split(', ');
                if (tokens.length > 1) {
                    let all = getMeetingRoom(row.location.name)
                        .filter(room => ROOM_REGEX_PATTERN.test(room))
                        .sort((a, b) => a.localeCompare(b));
                    room = <>{all[0]} <span className={styles.extraRoomsIndicator}>{'+' + (all.length - 1)}</span></>;
                }

                return <>
                            <span id={`tooltip-room-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>{room}</span>
                            {
                                room !== 'None' && room !== 'Unknown' && (
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-room-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        {
                                            tokens
                                                .sort((a, b) => a.localeCompare(b))
                                                .map((token, i) => {
                                                    let code = Object.keys(BuildingCode).find(key => token.startsWith(key));
                                                    if (!code) return <><span>{token}</span>{i !== tokens.length - 1 ? <br/> : ''}</>
                                                    return <><span className={styles.roomTooltip}>{BuildingCode[code]} {token.split(code).map(ent => ent.trim()).join('')}</span>{i !== tokens.length - 1 ? <br/> : ''}</>;
                                                })
                                        }
                                    </UncontrolledTooltip>
                                )
                            }
                        </>
            },
            sortable: true,
            grow: useTerm ? 0 : 0.5,
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
                        <span id={`tooltip-prof-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>{display}</span>
                        {
                            row.instructor.trim() && (
                                <UncontrolledTooltip delay={0} placement="top" target={`tooltip-prof-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
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
                    <span id={`tooltip-schedule-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}><>{tokens[0]} {tokens.length !== 1 ? <span className={styles.extraRoomsIndicator}>{'+' + (tokens.length - 1)}</span> : <></>}</></span>
                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-schedule-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
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
                                                <span className="text-primary" id={`tooltip-waitlist-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>(+{row.enrollment.waitlist})</span>{" "}
                                                <UncontrolledTooltip delay={0} placement="top" target={`tooltip-waitlist-${row.section}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
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