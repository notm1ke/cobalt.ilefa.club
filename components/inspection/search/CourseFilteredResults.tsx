import MdiIcon from '@mdi/react';
import DataTable from 'react-data-table-component';

import { CoursePayload } from '../../../hooks';
import { TableColumn } from 'react-data-table-component';
import { ContentArea, getIconForCourse, isGradLevel } from '../../../util';

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

    return <>{ symbols.map(symbol => <MdiIcon path={symbol.icon} className={`fa-fw ${symbol.color || 'text-primary'}`} size={symbol.size || '20px'} />) }</>
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
    
    console.log(suggestions);

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
            // expandableRowsComponent={ExpandedSectionData}
            sortIcon={<MdiIcon path={mdiChevronDown}/>}
            columns={columns}
            data={suggestions}
        />
    )
}