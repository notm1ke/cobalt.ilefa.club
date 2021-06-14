import React from 'react';
import classnames from 'classnames';
import CourseMappings from '@ilefa/husky/courses.json';
import styles from '../../components/styling/course.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useState } from 'react';
import { searchCourse } from '@ilefa/husky';
import { DataView, Footer, Nav, OverviewTab, SectionsTab } from '../../components';
import { CompleteCoursePayload, CourseAttributes, getIconForCourse } from '../../util';

import {
    Card,
    CardBody,
    TabContent,
    TabPane,
    Nav as Navbar,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

const getSidebarInfo = (data: CompleteCoursePayload) => [
    {
        icon: 'fa fa-chalkboard',
        name: 'Overview',
        marginTop: '0',
        contents: [
            {
                name: 'Credits',
                value: data.credits + '.0'
            },
            {
                name: 'Grading Type',
                value: data.grading 
            },
            {
                name: 'Sections',
                value: data.sections.length
            },
            {
                name: 'Campuses',
                value: [...new Set(data.sections.map(section => section.campus))].length
            },
            {
                name: 'Professors',
                value: data.professors.length
            }
        ]
    },
    {
        icon: 'fa fa-check-double',
        name: 'Competencies',
        contents: [
            {
                name: 'Labratory (L)',
                value: generateCompBadge(data.attributes.lab)
            },
            {
                name: 'Writing (W)',
                value: generateCompBadge(data.attributes.writing)
            },
            {
                name: 'Quantitative (Q)',
                value: generateCompBadge(data.attributes.quantitative)
            },
            {
                name: 'Environmental (E)',
                value: generateCompBadge(data.attributes.environmental)
            }
        ]
    }
];

const generateCompBadge = (bool: boolean) => <Badge color={bool ? 'success' : 'danger'} pill>{bool ? <i className="fa fa-check fa-fw"></i> : <i className="fa fa-times fa-fw"></i>}</Badge>

const TABS = [
    {
        icon: 'fa fa-file-alt',
        name: 'Overview',
        id: 'overview',
        idInt: 0,
    },
    {
        icon: 'fa fa-drafting-compass',
        name: 'Sections',
        id: 'sections',
        idInt: 1,
    },
    {
        icon: 'fa fa-user-friends',
        name: 'Professors',
        id: 'professors',
        idInt: 2,
    }
];

const CourseInspection = (props) => {
    const { data, name } = props;
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const changeTab = (e, state) => {
        e.preventDefault();
        setActiveTab(state);
    }

    const info = getSidebarInfo(data);
    const icon = getIconForCourse(name, styles.courseIcon, 40);

    return (
        <main>
            <Nav/>
            <div className="position-relative background-gradient">
                <div className="section section-hero section-shaped background-circuits">
                    <div className="shape shape-style-3 shape-default"></div>
                    <div className={globalStyles.pageHeader}>
                        <div className="container shape-container d-flex align-items-center py-lg">
                            <div className="col px-0">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>{icon}{name.toUpperCase()}</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            { data.catalogName }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.sectionSeperator} background-circuits`}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="row row-grid">
                                    <div className="col-lg-3 pr-0">
                                        <div className="card shadow border-0">
                                            <div className="card-body py-10">
                                                {
                                                    info.map(entry => 
                                                        <>
                                                            <pre className={`font-weight-500 mt-${entry.marginTop ? entry.marginTop : 3} mb-2 ${styles.statisticSection} text-primary`}><i className={entry.icon + " fa-fw text-primary"}></i> {entry.name}</pre>
                                                            {
                                                                entry.contents.map(keys => <DataView key={keys.name.toLowerCase()} name={keys.name} value={keys.value} />)
                                                            }
                                                            <div className={styles.horizontalDivider}></div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <Card className="shadow border-0">
                                            <CardBody className="pt-0">
                                                <div className="nav-wrapper wrap">
                                                    <Navbar 
                                                        className="nav-pills nav-fill flex-column flex-md-row" 
                                                        id="tabs-icons-text" 
                                                        role="tablist"
                                                    >
                                                        {
                                                            TABS.map(entry => 
                                                                <>
                                                                    <NavItem>
                                                                        <NavLink
                                                                            aria-selected={activeTab === entry.id}
                                                                            className={classnames(`mb-sm-3 mb-md-0 pills-primary cursor-pointer`, {
                                                                                active: activeTab === entry.id,
                                                                                show: activeTab === entry.id,
                                                                            })}
                                                                            onClick={e => changeTab(e, entry.id)}
                                                                            role="tab"
                                                                        >
                                                                            <i className={entry.icon + " fa-fw mr-1"}></i> {entry.name}
                                                                        </NavLink>
                                                                    </NavItem>
                                                                </>
                                                            )
                                                        }
                                                    </Navbar>
                                                </div>
                                                {/* add `shadow` class to give back shadow to the below node */}
                                                <div className={styles.tabBody}>
                                                    <TabContent activeTab={activeTab} id="tab">
                                                        <TabPane tabId="overview">
                                                            <OverviewTab data={data} />
                                                        </TabPane>
                                                        <TabPane tabId="sections">
                                                            <SectionsTab data={data} />
                                                        </TabPane>
                                                        <TabPane tabId="professors">
                                                            
                                                        </TabPane>
                                                    </TabContent>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer white={true} />
            </div>
        </main>
    );
}

export async function getStaticPaths() {
    const paths = CourseMappings
        .map(ent => ent.name)
        .map(ent => ({
            params: { name: ent }
        }))
        .concat(
            CourseMappings
                .map(ent => ent.name.toLowerCase())
                .map(ent => ({
                    params: { name: ent }
                })));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const { name } = context.params;

    let course = await searchCourse(name.toUpperCase());
    let mappings = CourseMappings.filter(mapping => mapping.name.toUpperCase() === name.toUpperCase())[0];

    if (!course || !course.name || !mappings)
        return { notFound: true }

    let payload: CompleteCoursePayload = {
        name: mappings.name,
        catalogName: mappings.catalogName,
        catalogNumber: mappings.catalogNumber,
        attributes: mappings.attributes as CourseAttributes,
        grading: course.grading,
        credits: parseInt(course.credits),
        prerequisites: course.prereqs,
        description: course.description,
        sections: course.sections,
        professors: course.professors
    }

    return {
        props: {
            name: name.toUpperCase(),
            data: payload
        }
    }
}

export default CourseInspection;