import React from 'react';
import Head from 'next/head';
import classnames from 'classnames';

import styles from '../../components/styling/inspection.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { BuildingCode } from '@ilefa/husky';
import { RoomInspectionPayload, useRoom } from '../../hooks';

import {
    CompleteRoomPayload,
    getIconForRoom,
    isDevelopment,
    RoomImageMode
} from '../../util';

import {
    DataView,
    DevElement,
    ErrorView,
    Footer,
    Loader,
    Nav,
    RoomBuildingTab,
    RoomOverviewTab,
    RoomScheduleTab
} from '../../components';

import {
    Card,
    CardBody,
    Badge,
    Navbar,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';

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

const getSidebarInfo = (data: CompleteRoomPayload): SidebarEntry[] => [
    {
        icon: 'fa fa-users',
        name: 'Capacity',
        marginTop: '0',
        contents: [
            {
                name: 'COVID-19',
                value: data.capacity.covid.toLocaleString()
            },
            {
                name: 'Regular',
                value: data.capacity.full.toLocaleString()
            }
        ]
    },
    {
        icon: 'fa fa-flag',
        name: 'Amenities',
        contents: [
            {
                name: 'Air Conditioned',
                value: generateAmenityBadge(data.airConditioned)
            },
            {
                name: 'BYOD Testing',
                value: generateAmenityBadge(data.byodTesting)
            }
        ]
    },
    {
        icon: 'fa fa-video',
        name: 'Conferencing',
        contents: [
            {
                name: 'Share Content',
                value: generateAmenityBadge(data.videoConference?.attributes.shareContent)
            },
            {
                name: 'Instructor-facing Camera',
                value: generateAmenityBadge(data.videoConference?.attributes.instructorFacingCamera)
            },
            {
                name: 'Student-facing Camera',
                value: generateAmenityBadge(data.videoConference?.attributes.studentFacingCamera)
            },
            {
                name: 'Present Media in Front',
                value: generateAmenityBadge(data.videoConference?.attributes.presentMediaFrontOfRoom)
            },
            {
                name: 'Present Media in Rear',
                value: generateAmenityBadge(data.videoConference?.attributes.presentMediaBackOfRoom)
            },
            {
                name: 'Instructor Microphone',
                value: generateAmenityBadge(data.videoConference?.attributes.instructorMicrophone)
            },
            {
                name: 'Student Microphone(s)',
                value: generateAmenityBadge(data.videoConference?.attributes.studentMicrophone)
            },
            {
                name: 'Webex Capability',
                value: generateAmenityBadge(data.videoConference?.attributes.connectToWebex)
            },
        ]
    },
];

const TABS = [
    {
        icon: 'fa fa-file-alt',
        name: 'Overview',
        id: 'overview',
        idInt: 0,
    },
    {
        icon: 'fa fa-calendar-day',
        name: 'Schedule',
        id: 'schedule',
        idInt: 1,
    },
    {
        icon: 'fa fa-building',
        name: 'Building',
        id: 'building',
        idInt: 2,
    },
    {
        icon: 'fa fa-broadcast-tower',
        name: 'Metrics',
        id: 'metrics',
        idInt: 3,
        devOnly: true
    }
];

const generateAmenityBadge = (bool: boolean | undefined) => (
    <Badge color={bool === undefined ? 'dark' : bool ? 'success' : 'danger'} pill>
        {
            bool === undefined
                ? <i className="fa fa-question fa-fw"></i>
                : bool
                    ? <i className="fa fa-check fa-fw"></i>
                    : <i className="fa fa-times fa-fw"></i>
        }
    </Badge>
);

const getImageMode = ({ threeSixtyView }: RoomInspectionPayload) => {
    if (!threeSixtyView)
        return null;
    
    if (threeSixtyView.startsWith('https://live.staticflickr.com'))
        return RoomImageMode.THREE_SIXTY;

    return RoomImageMode.STATIC;
}

const ClassroomInspection = () => {
    const router = useRouter();
    let { name } = router.query;
    if (name instanceof Array)
        return <ErrorView title="Error" message="Something went wrong while processing your request." />;

    if (name) name = name.toUpperCase();

    const [room, _request, loading, error] = useRoom({ name });
    const [activeTab, setActiveTab] = useState('overview');
    
    const changeTab = (e, state) => {
        e.preventDefault();
        setActiveTab(state);
    }

    if (loading) return <Loader />;
    if (error) return <ErrorView title="Error" message="Something went wrong while retrieving data." />;
    if (!room) return <Loader />;

    const info = getSidebarInfo(room);
    const icon = getIconForRoom(room, styles.courseIcon, 40);
    const imageMode = getImageMode(room);

    const styledName = room.building.code + ' ' + room.name.slice(room.building.code.length);

    return (
        <main>
            <Head>
                <title>Cobalt » {room.name}</title>
                <meta name="description" content={`View more information about ${room.name} on Cobalt.`} />
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>{icon}{styledName}</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            { BuildingCode[room.building.code] }
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
                                                <DevElement>
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
                                                </DevElement>
                                                {/* add `shadow` class to give back shadow to the below node */}
                                                <div className={styles.tabBody}>
                                                    <TabContent activeTab={activeTab} id="tab">
                                                        <TabPane tabId="overview">
                                                            <RoomOverviewTab
                                                                room={room}
                                                                imageMode={imageMode}
                                                                styledName={styledName} />
                                                        </TabPane>
                                                        <TabPane tabId="schedule">
                                                            <RoomScheduleTab room={room} />
                                                        </TabPane>
                                                        <TabPane tabId="building">
                                                            <RoomBuildingTab room={room} />
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
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}
    
export default ClassroomInspection;