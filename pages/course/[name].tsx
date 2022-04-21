import React from 'react';
import Head from 'next/head';
import classnames from 'classnames';
import styles from '../../components/styling/inspection.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCourse } from '../../hooks';
import { decode as decodeEntities } from 'html-entities';

import {
    CompleteCoursePayload,
    getIconForCourse,
    isDevelopment,
    matchGradingType,
    MetricsEvent
} from '../../util';

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

import {
    DataView,
    DevElement,
    EquivTab,
    ErrorTab,
    ErrorView,
    Footer,
    Loader,
    LoaderTab,
    MetricsTab,
    Nav,
    OverviewTab,
    ProfessorsTab,
    SectionsTab,
} from '../../components';

type SidebarEntry = {
    icon: string;
    name: string;
    marginTop?: string;
    contents: SidebarEntryContents[];
}

type SidebarEntryContents = {
    name: string;
    value: string | number | JSX.Element;
}

const getSidebarInfo = (data: CompleteCoursePayload, setActiveTab: React.Dispatch<React.SetStateAction<string>>): SidebarEntry[] => [
    {
        icon: 'fa fa-chalkboard',
        name: 'Overview',
        marginTop: '0',
        contents: [
            {
                name: 'Credits',
                value: data.credits ? data.credits + '.0' : 'Unknown'
            },
            {
                name: 'Grading Type',
                value: matchGradingType(data.grading) || (data.grading ?? 'Unknown')
            },
            {
                name: 'Campuses',
                value: [...new Set(data.sections.map(section => section.campus))].length
            },
            {
                name: 'Sections',
                value: <span className="text-primary shine pointer" onClick={() => setActiveTab('sections')}>{data.sections.length}</span>
            },
            {
                name: 'Professors',
                value: <span className="text-primary shine pointer" onClick={() => setActiveTab('professors')}>
                    {
                        [...new Set(data
                            .sections
                            .map(section => section.instructor.trim())
                            .filter(prof => !prof.includes(','))
                            .filter(prof => !!prof))].length
                    }
                </span>
            }
        ]
    },
    {
        icon: 'fa fa-check-double',
        name: 'Competencies',
        contents: [
            {
                name: 'Laboratory (L)',
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
]

const generateCompBadge = (bool: boolean) => (
    <Badge color={bool ? 'success' : 'danger'} pill>
        {
            bool
                ? <i className="fa fa-check fa-fw"></i>
                : <i className="fa fa-times fa-fw"></i>
        }
    </Badge>
);

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
    },
    {
        icon: 'fa fa-arrow-right-arrow-left',
        name: 'Transfer',
        id: 'transfer',
        idInt: 3,
    },
    {
        icon: 'fa fa-broadcast-tower',
        name: 'Metrics',
        id: 'metrics',
        idInt: 4,
        devOnly: true
    }
];

const CourseInspection = () => {
    const router = useRouter();
    let { name } = router.query;
    if (name instanceof Array)
        return <ErrorView title="Error" message="Something went wrong while processing your request." />;

    if (name) name = name.toUpperCase();

    const [course, request, loading, error] = useCourse({ name, initial: true });
    const [activeTab, setActiveTab] = useState('overview');
    let metrics: MetricsEvent[] = [];

    if (loading) return <Loader />;
    if (error) return <ErrorView title="Error" message="Something went wrong while retrieving data." />;
    if (!course) return <Loader />;

    const changeTab = (e, state) => {
        e.preventDefault();
        setActiveTab(state);
    }

    const recordMetric = (event: MetricsEvent) => metrics.push(event);
    recordMetric({ request, success: true, data: course, time: course.timings });
    
    const info = getSidebarInfo(course, setActiveTab);
    const icon = getIconForCourse(name, styles.courseIcon, 40);

    return (
        <main>
            <Head>
                <title>Cobalt » {name.toUpperCase()}</title>
                <meta name="description" content={`View more information about ${name.toUpperCase()} on Cobalt.`} />
            </Head>
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
                                            { decodeEntities(course.catalogName) }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.sectionSeparator} background-circuits`}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="row row-grid">
                                    <div className={`col-lg-3 ${styles.pr0}`}>
                                        <div className="card shadow border-0">
                                            <div className="card-body py-10">
                                                {
                                                    info.map(entry => 
                                                        <>
                                                            <div key={entry.name}>
                                                                <pre className={`font-weight-500 mt-${entry.marginTop ? entry.marginTop : 3} mb-2 ${styles.statisticSection} text-primary`}><i className={entry.icon + " fa-fw text-primary"}></i> {entry.name}</pre>
                                                                {
                                                                    entry.contents.map(keys => <DataView key={keys.name.toLowerCase()} name={keys.name} value={keys.value} />)
                                                                }
                                                                <div className={styles.horizontalDivider}></div>
                                                            </div>
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
                                                            TABS.map(entry => {
                                                                if (entry.devOnly && !isDevelopment()) return <></>;
                                                                return <NavItem key={entry.id}>
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
                                                            })
                                                        }
                                                    </Navbar>
                                                </div>
                                                {/* add `shadow` class to give back shadow to the below node */}
                                                <div className={activeTab === 'sections' ? styles.tabBodyDataTable : styles.tabBody}>
                                                    <TabContent activeTab={activeTab} id="tab">
                                                        <TabPane tabId="overview">
                                                            <OverviewTab data={course} />
                                                        </TabPane>
                                                        <TabPane tabId="sections" className={styles.tabBodyDataTable}>
                                                            <SectionsTab data={course} />
                                                        </TabPane>
                                                        <TabPane tabId="professors">
                                                            {
                                                                course && !loading && !error && (
                                                                    <ProfessorsTab course={course} recordMetric={recordMetric} />
                                                                )
                                                            }
                                                            
                                                            { loading && <LoaderTab /> }
                                                            { error && <ErrorTab message="Something went wrong while fetching the professors for this course." color="text-gray" /> }
                                                        </TabPane>
                                                        <TabPane tabId="transfer">
                                                            <EquivTab data={course} recordMetric={recordMetric} />
                                                        </TabPane>
                                                        <DevElement>
                                                            <TabPane tabId="metrics">
                                                                <MetricsTab metrics={metrics} />
                                                            </TabPane>
                                                        </DevElement>
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
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}
    
export default CourseInspection;