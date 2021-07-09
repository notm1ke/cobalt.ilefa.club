import React from 'react';
import Link from 'next/link';
import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';
import styles from '../styling/inspection.module.css';
import Classrooms from '@ilefa/husky/classrooms.json';

import { ErrorTab } from '.';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Collapse } from 'reactstrap';
import { mdiChevronDown } from '@mdi/js';
import { SectionData } from '@ilefa/husky';
import { IDataTableColumn } from 'react-data-table-component';
import { CompleteCoursePayload, getMeetingTime } from '../../util';

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
                                    <p><b>Schedule:</b> {
                                        data.schedule.trim().length
                                            ? data.schedule.trim()
                                            : data.location.name === 'No Room Required - Online'
                                                ? 'Does not meet'
                                                : 'Unknown'
                                    }</p>
                                    <p><b>Location:</b> {
                                        data.location.name === 'No Room Required - Online'
                                            ? 'Virtual'
                                            : !!managedRoom
                                                ? <Link href={`/room/${data.location.name.toUpperCase().replace(' ', '')}`}>
                                                        <a className="text-primary shine">{data.location.name}</a>
                                                  </Link>
                                                : data.location.name
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
            grow: 0
        },
        {
            name: 'Campus',
            selector: 'campus',
            sortable: true,
            grow: 0,
        },
        {
            name: 'Professor',
            selector: 'instructor',
            format: (row, _i) => row.instructor.trim().length ? row.instructor.replace('<br>', ' ').replace('&nbsp;', ' ') : 'Unknown',
            sortable: true
        },
        {
            name: 'Schedule',
            selector: 'schedule',
            format: (row, i) => getMeetingTime(row.schedule.trim(), sections[i].location),
            sortable: true
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