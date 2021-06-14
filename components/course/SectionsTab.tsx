import React from 'react';
import MdiIcon from '@mdi/react';
import styles from '../styling/course.module.css';
import DataTable from 'react-data-table-component';

import { useState } from 'react';
import { Collapse } from 'reactstrap';
import { mdiChevronDown } from '@mdi/js';
import { SectionData } from '@ilefa/husky';
import { CompleteCoursePayload } from '../../util';
import { IDataTableColumn } from 'react-data-table-component';

export interface SectionsTabProps {
    data: CompleteCoursePayload;
}

interface SectionDataProps {
    data?: SectionData;
    course: CompleteCoursePayload;
}

export const ExpandedSectionData = ({ data, course }: SectionDataProps) => {
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

    return (
        <div className={styles.sectionDataExpanded}>
            <div className={styles.statisticList}>
                <li className={styles.statisticItem}>
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
                                    <p><b>Modality:</b> {data.mode}</p>
                                    <p><b>Schedule:</b> {data.schedule}</p>
                                    <p><b>Location:</b> {data.location.name === 'No Room Required - Online' ? 'Virtual' : <a href={data.location.url ?? '#'} className="text-primary shine" target="_blank" rel="noopener noreferrer">{data.location.name}</a>}</p>
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
                <li className={styles.statisticItem} onClick={collapseRaw}>
                    <div className={styles.statisticImage}>
                        <i className="fa fa-file-code fa-fw text-primary"></i>
                    </div>
                    <div className={styles.details}>
                        <span className="text-dark">
                            <p><b>Raw Data</b></p>
                            <p>
                                Click to {raw ? 'hide' : 'reveal'} raw data.
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

export const SectionsTab = ({ data }: SectionsTabProps) => {
    const { sections } = data;
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
        // {
        //     name: 'Modality',
        //     selector: 'mode',
        //     sortable: true,
        //     grow: 1,
        // },
        {
            name: 'Professor',
            selector: 'instructor',
            format: (row, _i) => row.instructor.trim().length ? row.instructor.replace('<br>', ' ').replace('&nbsp;', ' ') : 'Unknown',
            sortable: true
        },
        {
            name: 'Schedule',
            selector: 'schedule',
            sortable: true
        },
        // {
        //     name: <MdiIcon path={mdiAccountMultiple} size="20px" />,
        //     selector: 'enrollment.current',
        //     sortable: true,
        //     format: (row, _i) => row.enrollment.current + '/' + row.enrollment.max,
        //     grow: 0,
        // }
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