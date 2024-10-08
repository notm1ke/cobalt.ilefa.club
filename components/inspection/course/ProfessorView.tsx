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
import MdiIcon from '@mdi/react';
import styles from '../../styling/inspection.module.css';

import * as Icons from '@mdi/js';

import { useState } from 'react';
import { Badge, Collapse } from 'reactstrap';
import { ProfessorData } from '@ilefa/husky';
import { BluepagesRecord } from '@ilefa/bluepages';
import { decode as decodeEntities } from 'html-entities';
import { useBluepages, useProfessor } from '../../../hooks';

import {
    addTrailingDecimal,
    capitalizeFirst,
    getCampusIndicator,
    getTermCode,
    IMetricsComponent,
    RMP_TAG_CONS,
    RMP_TAG_PROS,
    semesterComparator
} from '../../../util';

export interface ProfessorViewProps extends IMetricsComponent {
    professor: ProfessorData;
    rmp: boolean;
    show: boolean;
    showTerm: boolean;
}

enum RmpTag {
    PRO = 'fa fa-thumbs-up text-success',
    CON = 'fa fa-thumbs-down text-danger',
    UNKNOWN = 'fa fa-question-circle text-primary'
}

enum RmpTagOrdinal {
    PRO, CON, UNKNOWN
}

const ratingBadgeColor = (rating: number, text: boolean = false) => {
    if (isNaN(rating)) return text ? styles.ratingGrayText : styles.ratingGray;
    if (rating > 4.5) return text ? styles.ratingGreenText : styles.ratingGreen;
    if (rating > 3.75) return text ? styles.ratingLimeText : styles.ratingLime;
    if (rating > 3) return text ? styles.ratingYellowText : styles.ratingYellow;
    if (rating > 2.50) return text ? styles.ratingOrangeText : styles.ratingOrange;
    
    return text ? styles.ratingRedText : styles.ratingRed;
}

const difficultyColor = (rating: number) => {
    if (isNaN(rating)) return styles.ratingGrayText;
    if (rating > 4) return styles.ratingRedText;
    if (rating >= 3.5) return styles.ratingOrangeText;
    if (rating >= 3) return styles.ratingYellowText;
    if (rating >= 2.5) return styles.ratingLimeText;
    
    return styles.ratingGreenText;
}

const retakeRateColor = (percent: number) => {
    if (isNaN(percent)) return styles.ratingGrayText;
    if (percent > 90) return styles.ratingGreenText;
    if (percent > 80) return styles.ratingLimeText;
    if (percent > 70) return styles.ratingYellowText;
    if (percent > 60) return styles.ratingOrangeText;
    
    return styles.ratingRedText;
}

interface BluepagesAttributeProps {
    data: BluepagesRecord;
    attribute: keyof BluepagesRecord;
    display: string | JSX.Element;
    transform?: (attrib: string) => string;
}

const BluepagesAttribute: React.FC<BluepagesAttributeProps> = ({ data, attribute, display, transform }) => (
    <>
        {
            data[attribute] && (
                <li>{display} <b>{transform ? transform(data[attribute]!) : data[attribute]}</b></li>
            )
        }
    </>
)

const round = (num: number) => Math.round(num * 100) / 100;

const generateRatingBadge = (rating: number) => (
    <Badge className={`${ratingBadgeColor(rating)} ${styles.rating} ml-1`} pill>
        { isNaN(rating) ? 'N/A' : addTrailingDecimal(round(rating)) }
    </Badge>
);

const getLetterIcon = (name: string, def?: string) => {
    return Icons[`mdiAlpha${name.substring(0, 1).toUpperCase()}Circle`] || (def ?? Icons.mdiAccountCircle);
}

const proOrCon = (tag: string) => {
    if (RMP_TAG_PROS.includes(tag.toLowerCase()))
        return RmpTag.PRO;

    if (RMP_TAG_CONS.includes(tag.toLowerCase()))
        return RmpTag.CON;

    return RmpTag.UNKNOWN;
}

const proOrConSorting = (tag: string) => {
    if (RMP_TAG_PROS.includes(tag.toLowerCase()))
        return RmpTagOrdinal.PRO;

    if (RMP_TAG_CONS.includes(tag.toLowerCase()))
        return RmpTagOrdinal.CON;

    return RmpTagOrdinal.UNKNOWN;
}

export const ProfessorView: React.FC<ProfessorViewProps> = ({ professor, show, showTerm, recordMetric }) => {
    const [active, setActive] = useState(show);
    const toggle = () => setActive(!active);
    
    const [data, request, loading, error] = useProfessor({ rmpIds: professor.rmpIds, recordMetric });
    const [bluepages, _request, bLoading, bError] = useBluepages({ name: professor.name, recordMetric });

    if (error) {
        recordMetric({ request, success: false, time: -1 })
        professor.rmpIds = [];
    }

    if (!professor.rmpIds.length) return (
        <div className={`${styles.statisticList} ${styles.statisticListProf}`}>
            <li className={styles.statisticItem} key={professor.name}>
                <div className={styles.statisticImage} onClick={toggle}>
                    <MdiIcon path={getLetterIcon(professor.name)} className="fa-fw text-primary" />
                </div>
                <div className={styles.details}>
                    <span className="text-dark">
                        <p onClick={toggle}><b>{professor.name} {generateRatingBadge(NaN)}</b></p>
                        <p>
                            <span onClick={toggle}>Click to {active ? 'hide' : 'reveal'} professor report.</span>
                            <Collapse isOpen={active} className={styles.statisticCollapse}>
                                <p><b>Bluepages Report:</b></p>
                                <ul className={styles.ratingTags}>
                                    { bLoading && <li><i className="fa fa-spinner fa-spin fa-fw"></i> Loading..</li> }
                                    { bError && <li>Report for <b>{professor.name}</b> is not available.</li> }

                                    {
                                        bluepages && !bLoading && (
                                            <>
                                                <BluepagesAttribute data={bluepages} attribute="email" display="Email:" />
                                                <BluepagesAttribute data={bluepages} attribute="netId" display="NetID:" />
                                                <BluepagesAttribute data={bluepages} attribute="building" display="Building:" />
                                                <BluepagesAttribute data={bluepages} attribute="department" display="Dept:" />
                                                <BluepagesAttribute data={bluepages} attribute="title" display="Title:" transform={title => decodeEntities(capitalizeFirst(title.toLowerCase()))} />
                                            </>
                                        )
                                    }
                                </ul> 

                                <p><b>Sections Taught:</b></p>
                                <ul className={styles.ratingTags}>
                                    {
                                        professor
                                            .sections
                                            .sort((a, b) => semesterComparator(a.term, b.term))
                                            .map(ent => (
                                                <li key={ent.section}>
                                                    <MdiIcon path={getLetterIcon(getCampusIndicator(ent.campus), Icons.mdiHelpCircle)} size={'21px'} className="text-primary-light mr-1 fa-fw" /><b>[{ent.campus}{showTerm ? ` - ${getTermCode(ent.term) + ent.term.split(/(\d{2,4})/)[1].substring(2)}` : ''}] {ent.section}</b> <span className={ent.enrollment.current === ent.enrollment.max ? 'text-danger' : 'text-success'}>({ent.enrollment.current}/{ent.enrollment.max})</span>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </Collapse>
                        </p>
                    </span>
                </div>
            </li>
        </div>
    );
    
    if (loading || !data) return <></>;
    recordMetric({ request, success: true, time: data.timings });
    
    return (
        <div className={`${styles.statisticList} ${styles.statisticListProf}`}>
            <li className={styles.statisticItem} key={professor.name}>
                <div className={styles.statisticImage} onClick={toggle}>
                    <MdiIcon path={getLetterIcon(professor.name)} className="fa-fw text-primary" />
                </div>
                <div className={styles.details}>
                    <span className="text-dark">
                        <p onClick={toggle}><b>{professor.name} {generateRatingBadge(data?.average)}</b></p>
                        <p>
                            <span onClick={toggle}>Click to {active ? 'hide' : 'reveal'} professor report.</span>
                            <Collapse isOpen={active} className={styles.statisticCollapse}>
                                <p><b>{professor.name}</b> was scored <span className={`${ratingBadgeColor(round(data.average), true)} font-weight-500`}>{addTrailingDecimal(round(data.average))}/5.0</span> based on <b>{data.ratings} rating{data.ratings === 1 ? '' : 's'}</b>.</p>
                                <p>Difficulty Score: <b className={difficultyColor(data.difficulty)}>{addTrailingDecimal(data.difficulty)}/5.0</b></p>
                                <p>Would Retake: <b className={retakeRateColor(data.takeAgain)}>{data.takeAgain}%</b></p><br/>

                                <a className="text-primary shine" href={`https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${data.mostRelevant}`} target="_blank" rel="noreferrer noopener">
                                    <i className="fa fa-external-link-alt fa-fw"></i> View ratings on RateMyProfessors</a>
                                <br/><br/>

                                <p><b>Student-Assigned Tags:</b></p>
                                <ul className={styles.ratingTags}>
                                    {
                                        !data.tags.length && (
                                            <li>None</li>
                                        )
                                    }

                                    {
                                        data
                                            .tags
                                            .filter((val, i, self) => self.indexOf(val) === i)
                                            .sort((a, b) => proOrConSorting(a) - proOrConSorting(b))
                                            .map(ent => (
                                                <li key={ent}>
                                                    <i className={`${proOrCon(ent)} fa-fw`}></i> {ent}
                                                </li>
                                            ))
                                    }
                                </ul>
                                
                                <p><b>Bluepages Report:</b></p>
                                <ul className={styles.ratingTags}>
                                    { bLoading && <li><i className="fa fa-spinner fa-spin fa-fw"></i> Loading..</li> }
                                    { bError && <li>Report for <b>{professor.name}</b> is not available.</li> }

                                    {
                                        bluepages && !bLoading && (
                                            <>
                                                <BluepagesAttribute data={bluepages} attribute="email" display="Email:" />
                                                <BluepagesAttribute data={bluepages} attribute="netId" display="NetID:" />
                                                <BluepagesAttribute data={bluepages} attribute="building" display="Building:" />
                                                <BluepagesAttribute data={bluepages} attribute="department" display="Dept:" />
                                                <BluepagesAttribute data={bluepages} attribute="title" display="Title:" transform={title => decodeEntities(capitalizeFirst(title.toLowerCase()))} />
                                            </>
                                        )
                                    }
                                </ul>

                                <p><b>Sections Taught:</b></p>
                                <ul className={styles.ratingTags}>
                                    {
                                        professor
                                            .sections
                                            .sort((a, b) => getCampusIndicator(a.campus).localeCompare(getCampusIndicator(b.campus)))
                                            .map(ent => (
                                                <li key={ent.section}>
                                                    <MdiIcon path={getLetterIcon(getCampusIndicator(ent.campus), Icons.mdiHelpCircle)} size={'21px'} className="text-primary-light" /> <b>[{ent.campus}{showTerm ? ` - ${ent.term.substring(0, 1) + ent.term.split(/(\d{2,4})/)[1].substring(2)}` : ''}] {ent.section}</b> <span className={ent.enrollment.current === ent.enrollment.max ? 'text-danger' : 'text-success'}>({ent.enrollment.current}/{ent.enrollment.max})</span>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </Collapse>
                        </p>
                    </span>
                </div>
            </li>
        </div>
    )
}