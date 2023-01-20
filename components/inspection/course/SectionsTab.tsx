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
import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';
import Classrooms from '@ilefa/husky/classrooms.json';

import styles from '../../styling/inspection.module.css';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CopyButton } from '../..';
import { mdiChevronDown } from '@mdi/js';
import { EnrollmentButton, ErrorTab } from '.';
import { UncontrolledTooltip } from 'reactstrap';
import { ExpandableRowsComponent, TableColumn } from 'react-data-table-component/dist/src/DataTable/types';

import {
    BuildingCode,
    Classroom,
    EnrollmentPayload,
    SectionData,
    SectionLocationData
} from '@ilefa/husky';

import {
    CompleteCoursePayload,
    convertFromHuskyEnrollment,
    convertToHuskyEnrollment,
    getCampusIndicator,
    getEnrollmentColor,
    getIconForRoom,
    getInstructorName,
    getMeetingTime,
    getModalityIndicator,
    getRealRoomCode,
    getRoomDisplayName,
    getSemesterColor,
    getTermCode,
    Modalities,
    prunePrimitiveDuplicates,
    replaceAll,
    SessionNames,
    shortenName,
    shortenWithEllipses
} from '../../../util';

export interface SectionsTabProps {
    data: CompleteCoursePayload;
}

export const ExpandedSectionData: ExpandableRowsComponent<SectionData> = ({ data }) => {
    if (!data || data === undefined) return (
        <div className={styles.sectionDataExpanded}>
            <pre className={`${styles.sectionTitle} text-danger`}><i className="fa fa-times-circle fa-fw"></i> Whoops</pre>
            <p>Sorry about that, something went wrong while loading information about this section.</p>
        </div>
    )

    const [classNumCopied, setClassNumCopied] = useState(false);
    const [classTermCopied, setTermCopied] = useState(false);
    const [classSessionCopied, setSessionCopied] = useState(false);

    const [enrollment, _setEnrollment] = useState<EnrollmentPayload>(convertFromHuskyEnrollment(data));

    let rooms = data.location.sort((a, b) => a.name.localeCompare(b.name));
    let multipleRooms = rooms.length > 1;

    let honors = data.notes && data.notes.toLowerCase().includes('honors');
    let managedRoom = data
        .location
        .map(ent => Classrooms.find(room => ent.name.replace(' ', '') === room.name))
        .filter(ent => ent !== undefined) as Classroom[];

    let meetingTime = getMeetingTime(data.schedule, data.location);
    if (meetingTime instanceof Array)
        meetingTime = prunePrimitiveDuplicates(meetingTime);

    return (
        <div className={styles.sectionDataExpanded}>
            <div className={styles.statisticList}>
                <li className={styles.statisticItem} key={uuid()}>
                    <div className={styles.statisticImage}>
                        <i className="fa fa-atlas fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p className="display-5 font-weight-bold"><b>Section Information</b></p>
                            <p>
                                <div className={styles.statisticCollapse}>
                                    <p><b>Section:</b> {data.section}</p>
                                    <p><b>Term:</b> {data.term}</p>
                                    <p><b>Campus:</b> {data.campus}</p>
                                    <p><b>Modality:</b> {data.mode}</p>
                                    <p><b>Instructor:</b> {data.instructor.trim().length ? getInstructorName(data.instructor) : 'Unknown'}</p>
                                    
                                    {
                                        data.session !== 'Reg' && <p><b>Session:</b> {SessionNames[data.session.toUpperCase()] ?? 'Unknown'}</p>
                                    }

                                    <p><b>Schedule:</b> {prunePrimitiveDuplicates(getMeetingTime(data.schedule, data.location, undefined, undefined, true) as string[]).join(' & ')}</p>
                                    <p><b>Location:</b> {
                                        !data.location.length
                                            ? 'Unknown'
                                            : data.location.every(ent => ent.name === 'No Room Required - Online')
                                                ? 'Virtual'
                                                : multipleRooms
                                                    ? rooms
                                                        .map((ent, i, arr) => {
                                                            let name = ent.name.replace(' ', '');
                                                            let room = Classrooms.find(room => room.name === ent.name);
                                                            let end = i === arr.length - 1 ? '' : ', ';
                                                            if (!room) return <span>{ent.name + end}</span>
                                                            
                                                            return <a href={`/room/${ent.name.toUpperCase().replace(' ', '')}`}>
                                                                      <>{getIconForRoom(room as Classroom, 'text-primary')} <a className="text-primary shine">{name}</a>{end}</>
                                                                   </a>
                                                        })
                                                    : managedRoom.length
                                                        ? managedRoom.map((ent, i) =>
                                                            <a href={`/room/${ent.name.replace(' ', '')}`}>
                                                                <>{getIconForRoom(ent as Classroom, 'text-primary')} <a className="text-primary shine">{data!.location[i].name}</a></>
                                                            </a>
                                                          )
                                                        : data.location
                                                            .map(ent => ent.name.split(' ').map((ent, i) => i !== 0 ? ent : getRealRoomCode(ent, ent)).join(' '))
                                                            .join(', ')
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
                                                <p><b>Notes:</b> <span dangerouslySetInnerHTML={{__html: data.notes}}></span></p>
                                                <br/>
                                            </>
                                        )
                                    }
                                    
                                    <p><b>Enrollment Information</b></p>
                                    <ul>
                                        <li><b>Current:</b> <span className={getEnrollmentColor(convertToHuskyEnrollment(enrollment, data))}>{enrollment.available}/{enrollment.total}</span></li>
                                        <li><b>Available Waitlist Spaces:</b> {data.enrollment.waitlist ?? 'Unavailable'}</li>
                                    </ul>

                                    <p><b>Internal Information</b></p>
                                    <ul>
                                        <li><b>Class Number:</b> <CopyButton className={(classNumCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.classNumber} onCopied={() => setClassNumCopied(true)} onCopyRecharged={() => setClassNumCopied(false)}>{data.internal.classNumber}</CopyButton></li>
                                        <li><b>Term Code:</b> <CopyButton className={(classTermCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.termCode} onCopied={() => setTermCopied(true)} onCopyRecharged={() => setTermCopied(false)}>{data.internal.termCode}</CopyButton></li>
                                        <li><b>Session Code:</b> <CopyButton className={(classSessionCopied ? 'text-success' : 'text-primary') + ` ${styles.identifierNumber}`} shine contentToCopy={data.internal.sessionCode} onCopied={() => setSessionCopied(true)} onCopyRecharged={() => setSessionCopied(false)}>{data.internal.sessionCode}</CopyButton></li>
                                    </ul>

                                    {/* <br />
                                    <span className="btn btn-link btn-success btn-sm text-white">I'm taking this section</span> */}
                                </div>
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

    let useTerm = true; // sections.some(section => section.term !== sections[0].term);
    const columns: TableColumn<SectionData>[] = [
        {
            name: 'Section',
            selector: row => row.section,
            sortable: true,
            format: (row, _i) => <>
                                    <b className={`${styles.campusIndicator} ${getSemesterColor(row.term)}`} id={`tooltip-campusIndicator-${row.section.replace(/\W/g, '')}-${row.campus}-${getTermCode(row.term) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        [{getCampusIndicator(row.campus)}/{getModalityIndicator(row.mode) + (useTerm ? `/${getTermCode(row.term) + row.term.split(/(\d{2,4})/)[1].substring(2)}` : '')}]
                                    </b> {row.section}
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-campusIndicator-${row.section.replace(/\W/g, '')}-${row.campus}-${getTermCode(row.term) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        <b>{row.campus}{useTerm ? ` - ${row.term}` : ''}</b>
                                        <br/><span className={styles.modalityTooltipType}>{row.mode}</span>
                                        <br/><span className={styles.modalityTooltipDescription}>{Modalities[getModalityIndicator(row.mode)] || ''}</span>
                                    </UncontrolledTooltip>
                                 </>,
            // grow: useTerm ? 0.65 : 0.45,
            width: '17.5%',
            allowOverflow: true
        },
        {
            name: 'Room',
            selector: row => row.location[0]?.name,
            format: (row, _i) => {
                let room = getRoomDisplayName(row);
                if (row.location.length > 1) {
                    let all = row.location.sort((a: SectionLocationData, b: SectionLocationData) => a.name.localeCompare(b.name));
                    room = <>{all[0].name} <span className={styles.extraRoomsIndicator}>{'+' + (all.length - 1)}</span></>;
                }

                return <>
                            <span id={`tooltip-room-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>{room}</span>
                            {
                                room !== 'None' && room !== 'Unknown' && (
                                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-room-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                        {
                                            row.location
                                                .sort((a: SectionLocationData, b: SectionLocationData) => a.name.localeCompare(b.name))
                                                .map((token: SectionLocationData, i: number) => {
                                                    let code = Object.keys(BuildingCode).find(key => token.name.startsWith(key));
                                                    if (!code) return <><span>{token.name}</span>{i !== row.location.length - 1 ? <br/> : ''}</>
                                                    return <>
                                                        <span className={styles.roomTooltip}>
                                                            {BuildingCode[code]} {token.name.split(code).map(ent => ent.trim()).join('')}
                                                        </span>{i !== row.location.length - 1 ? <br/> : ''}</>;
                                                })
                                        }
                                    </UncontrolledTooltip>
                                )
                            }
                        </>
            },
            sortable: true,
            // grow: useTerm ? 0 : 0.5,
            width: '17.5%',
            allowOverflow: true
        },
        {
            name: 'Professor',
            selector: row => row.instructor,
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
                if (cleanName.split(' & ').length > 1)
                    display = <>{shortenWithEllipses(cleanName.split(' & ')[0], 15)} <span className={styles.extraRoomsIndicator}>{'+' + (cleanName.split(' & ').length - 1)}</span></>;
                else if (cleanName.length > 20)
                    display = <>{shortenName(cleanName, 22)}</>;

                return (
                    <>
                        <span id={`tooltip-prof-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>{display}</span>
                        {
                            row.instructor.trim() && (
                                <UncontrolledTooltip delay={0} placement="top" target={`tooltip-prof-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                                    {
                                        cleanName
                                            .split(' & ')
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
            // grow: 0.65,
            width: '19%',
            allowOverflow: true
        },
        {
            name: 'Schedule',
            selector: row => row.schedule,
            format: (row, i) => {
                let tokens = getMeetingTime(row.schedule.trim(), sections[i].location, false, undefined, true) as string[];
                if (tokens.join('') === 'No Meeting Time' || tokens.join('') === 'Unknown')
                    return tokens;

                tokens = prunePrimitiveDuplicates(tokens);

                return <>
                    <span id={`tooltip-schedule-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}><>{tokens[0]} {tokens.length !== 1 ? <span className={styles.extraRoomsIndicator}>{'+' + (tokens.length - 1)}</span> : <></>}</></span>
                    <UncontrolledTooltip delay={0} placement="top" target={`tooltip-schedule-${row.section.replace(/\W/g, '')}-${row.campus}-${row.term.substring(0, 1) + row.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                        {
                            (prunePrimitiveDuplicates(
                                (getMeetingTime(row.schedule.trim(), sections[i].location, false, undefined, false) as string)
                                .split(' & '))
                                .map((time, i, arr) => <><span className={styles.roomTooltip}>{time}</span>{i !== arr.length - 1 ? <br/> : ''}</>))
                        }
                    </UncontrolledTooltip>
                </>;
            },
            sortable: true,
            width: '25%',
            allowOverflow: true
        },
        {
            name: 'Enrollment',
            selector: row => row.enrollment.current,
            sortable: true,
            center: true,
            format: (row, _i) => <EnrollmentButton course={data} data={row} />
        }
    ];

    return (
        <DataTable
            striped
            highlightOnHover
            pointerOnHover
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={ExpandedSectionData}
            sortIcon={<MdiIcon path={mdiChevronDown}/>}
            columns={columns}
            data={sections}
        />
    );
}