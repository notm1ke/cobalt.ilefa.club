import React from 'react';
import MdiIcon from '@mdi/react';
import styles from '../styling/inspection.module.css';

import * as Icons from '@mdi/js';

import { useState } from 'react';
import { useProfessor } from '../../hooks';
import { ProfessorData } from '@ilefa/husky';
import { Badge, Collapse } from 'reactstrap';

import {
    addTrailingDecimal,
    IMetricsComponent,
    RMP_TAG_CONS,
    RMP_TAG_PROS
} from '../../util';

export interface ProfessorViewProps extends IMetricsComponent {
    professor: ProfessorData;
    rmp: boolean;
    show: boolean;
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

const round = (num: number) => Math.round(num * 100) / 100;

const generateRatingBadge = (rating: number) => (
    <Badge className={`${ratingBadgeColor(rating)} ${styles.rating} ml-1`} pill>
        { isNaN(rating) ? 'N/A' : addTrailingDecimal(round(rating)) }
    </Badge>
);

const getLetterIcon = (name: string) => {
    return Icons[`mdiAlpha${name.substring(0, 1).toUpperCase()}Circle`] || Icons.mdiAccountCircle;
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

export const ProfessorView: React.FC<ProfessorViewProps> = ({ professor, show, recordMetric }) => {
    const [active, setActive] = useState(show);
    const toggle = () => setActive(!active);

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
                                <p><b>Sections Taught:</b></p>
                                <ul>
                                    {
                                        professor.sections.map(ent => (
                                            <li key={ent.section}>
                                                <b>[{ent.campus}] {ent.section}</b> <span className={ent.enrollment.current === ent.enrollment.max ? 'text-danger' : 'text-success'}>({ent.enrollment.current}/{ent.enrollment.max})</span>
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

    const { data, request, isLoading, isError } = useProfessor({ rmpIds: professor.rmpIds });
    if (isError) {
        recordMetric({ request, success: false, time: -1 })
        return <></>;
    }

    if (isLoading || !data) return <></>;
    recordMetric({ request, success: true, time: data.timings })
    
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
                                <ul>
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

                                <p><b>Sections Taught:</b></p>
                                <ul>
                                    {
                                        professor
                                            .sections
                                            .sort((a, b) => a.campus.localeCompare(b.campus))
                                            .map(ent => (
                                                <li key={ent.section}>
                                                    <b>[{ent.campus}] {ent.section}</b> <span className={ent.enrollment.current === ent.enrollment.max ? 'text-danger' : 'text-success'}>({ent.enrollment.current}/{ent.enrollment.max})</span>
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
};