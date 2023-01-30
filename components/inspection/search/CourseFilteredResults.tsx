import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';

import styles from '../../styling/inspection.module.css';

import { TableColumn } from 'react-data-table-component';
import { CoursePayload, useCourse } from '../../../hooks';
import { ExpandableRowsComponent } from 'react-data-table-component/dist/src/DataTable/types';

import {
    capitalizeFirst,
    ContentArea,
    getCampusIndicator,
    getCurrentSemester,
    getIconForCourse,
    getModalityIndicator,
    getSemesterColor,
    getTermCode,
    isGradLevel
} from '../../../util';

import {
    mdiAlphaGBox,
    mdiAlphaHBox,
    mdiBeakerOutline,
    mdiChevronDown,
    mdiFileDocumentEditOutline,
    mdiNumeric1Box,
    mdiNumeric2Box,
    mdiNumeric3Box,
    mdiNumeric4Box,
    mdiNumeric4BoxMultiple,
    mdiTree,
} from '@mdi/js';

export interface CourseFilteredResultsProps {
    suggestions: CoursePayload[];
}

type AttributeSymbol = {
    icon: string;
    color?: string;
    size?: string;
}

const hasContentArea = (course: CoursePayload, area: ContentArea) => 
        course
            .attributes
            .contentAreas
            .some(ca => ca === area);

const renderSymbols = (course: CoursePayload, element = true) => {
    let symbols: AttributeSymbol[] = [];
    if (course.attributes.lab)
        symbols.push({ icon: mdiBeakerOutline });

    if (course.attributes.writing)
        symbols.push({ icon: mdiFileDocumentEditOutline });

    if (course.attributes.environmental)
        symbols.push({ icon: mdiTree });

    if (course.grading === 'Honors Credit')
        symbols.push({ icon: mdiAlphaHBox, color: 'text-danger' });

    if (hasContentArea(course, ContentArea.CA1))
        symbols.push({ icon: mdiNumeric1Box });

    if (hasContentArea(course, ContentArea.CA2))
        symbols.push({ icon: mdiNumeric2Box });

    if (hasContentArea(course, ContentArea.CA3))
        symbols.push({ icon: mdiNumeric3Box });

    if (hasContentArea(course, ContentArea.CA4))
        symbols.push({ icon: mdiNumeric4Box });

    if (hasContentArea(course, ContentArea.CA4INT))
        symbols.push({ icon: mdiNumeric4BoxMultiple });

    if (isGradLevel(course.name.split(/\d/)[0], parseInt(course.name.split(/(\d{3,4})/)[1])))
        symbols.push({ icon: mdiAlphaGBox, color: 'text-success' });

    if (!element)
        return symbols;

    return <>{ symbols.map(symbol => generateIcon(symbol.icon, symbol.size, symbol.color)) }</>
}

const generateIcon = (icon: string, size?: string, color?: string) => <MdiIcon path={icon} className={`fa-fw ${color || 'text-primary'}`} size={size || '20px'} />;

const ExpandedCourseData: ExpandableRowsComponent<CoursePayload> = ({ data }) => {
    const [course, _url, loading, error] = useCourse({ name: data.name });

    if (loading && !error && !course) return (
        <div className="text-center my-3">
            <span>
                <i className="fa fa-spinner fa-spin fa-fw"></i> Loading...
            </span>
        </div>
    )

    if (error && !loading && !course) return (
        <div className="text-center my-3">
            <span>
                <i className="fa fa-times-circle fa-fw text-danger"></i> Error loading course data
            </span>
        </div>
    )

    let now = capitalizeFirst(getCurrentSemester());
    let currentSections = course!.sections.filter(s => s.term === now);
    let satisfiesAny = Object.keys(course!.attributes).some(key => course!.attributes[key]);

    return (
        <div className="py-3 px-4">
            <h5 className="text-primary">
                <a href={`/course/${course!.name}`} target="_blank" rel="noopener noreferrer" className="text-primary shine">
                    {getIconForCourse(data.name, 'fa-fw vaSub', 23)} <b>{course!.name}</b> — {data.catalogName}
                </a>
            </h5>

            <div className="mt-2">
                <span className="text-default">{course!.description}</span>
                <br/><br/><span className="text-default">
                    {
                        satisfiesAny && (
                            <>
                                This course satisfies the following requirements:
                                <ul className={`font-weight-600 ${styles.attribTags}`}>
                                    {course!.attributes.environmental && <li>{generateIcon(mdiTree)} Environmental</li>}
                                    {course!.grading === 'Honors Credit' && <li>{generateIcon(mdiAlphaHBox)} Honors Credit</li>}
                                    {course!.attributes.lab && <li>{generateIcon(mdiBeakerOutline)} Lab</li>}
                                    {course!.attributes.writing && <li>{generateIcon(mdiFileDocumentEditOutline)} Writing</li>}
                                    {hasContentArea(course!, ContentArea.CA1) && <li>{generateIcon(mdiNumeric1Box)} Content Area 1</li>}
                                    {hasContentArea(course!, ContentArea.CA2) && <li>{generateIcon(mdiNumeric2Box)} Content Area 2</li>}
                                    {hasContentArea(course!, ContentArea.CA3) && <li>{generateIcon(mdiNumeric3Box)} Content Area 3</li>}
                                    {hasContentArea(course!, ContentArea.CA4) && <li>{generateIcon(mdiNumeric4Box)} Content Area 4</li>}
                                    {hasContentArea(course!, ContentArea.CA4INT) && <li>{generateIcon(mdiNumeric4BoxMultiple)} Content Area 4 (International)</li>}
                                </ul>
                            </>
                        )
                    }
                </span>
                <hr />
                <span className="text-default">
                    {currentSections.length > 0 && (
                        <>
                            There are currently <b>{currentSections.length}</b> section{currentSections.length === 1 ? '' : 's'} being taught.
                            <ul className={styles.attribTags}>
                                {currentSections.map(entry => (
                                    <li key={entry.section}>
                                        <b className={`${styles.campusIndicator} ${getSemesterColor(entry.term)}`}>[{getCampusIndicator(entry.campus)}/{getTermCode(entry.term)}/{getModalityIndicator(entry.mode)}]</b> {entry.section} — {entry.instructor}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {
                        currentSections.length === 0 && (
                            <>
                                <i className="fa fa-times-circle text-danger fa-fw"></i> There are currently no sections being taught.
                            </>
                        )
                    }
                </span>
                <hr />
            </div>
        </div>
    )

}

export const CourseFilteredResults: React.FC<CourseFilteredResultsProps> = ({ suggestions }) => {    
    const columns: TableColumn<CoursePayload>[] = [
        {
            name: 'Course',
            selector: row => row.catalogName,
            sortable: true,
            format: row => (
                <span>
                    {getIconForCourse(row.name, 'fa-fw vaBottom', 19)} <b>{row.name}</b> — {row.catalogName}
                </span>
            ),
            width: '50%'
        },
        {
            name: 'Grading Type',
            selector: row => row.grading,
            sortable: true,
        },
        {
            name: 'Credits',
            selector: row => row.credits,
            sortable: true,
            format: row => (
                <span>{row.credits}.0</span>
            )
        },
        {
            name: 'Attributes',
            selector: row => row.name,
            sortable: true,
            format: row => (
                <>
                    {renderSymbols(row)}
                </>
            )
        }
    ]   
    
    return (
        <DataTable
            striped
            pagination
            paginationPerPage={25}
            defaultSortFieldId={0}
            highlightOnHover
            pointerOnHover
            expandableRows
            expandOnRowClicked
            noDataComponent={
                <div className="text-center my-3">
                    <span>
                        <i className="fa fa-times-circle fa-fw text-danger"></i> No results found
                    </span>
                </div>
            }
            expandableRowsComponent={ExpandedCourseData}
            sortIcon={<MdiIcon path={mdiChevronDown}/>}
            columns={columns}
            data={suggestions}
        />
    )
}