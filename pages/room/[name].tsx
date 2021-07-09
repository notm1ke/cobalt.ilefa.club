import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThreeSixtyRenderer from 'react-photosphere';
import styles from '../../components/styling/inspection.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useRoom } from '../../hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, CardBody, Badge } from 'reactstrap';
import { CompleteRoomPayload, getIconForRoom } from '../../util';

import {
    BoardType,
    BuildingCode,
    LectureCaptureType,
    SeatingType,
    TechType
} from '@ilefa/husky';

import {
    DataView,
    ErrorView,
    Footer,
    Loader,
    Nav
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
]

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

const ClassroomInspection = () => {
    const router = useRouter();
    let { name } = router.query;
    if (name instanceof Array)
        return <ErrorView title="Error" message="Something went wrong while processing your request." />;

    if (name) name = name.toUpperCase();

    const { data, isLoading, isError } = useRoom({ name });
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRendered(true);
        }

        return () => setRendered(false);
    }, []);

    if (isLoading) return <Loader />;
    if (isError) return <ErrorView title="Error" message="Something went wrong while retrieving data." />;
    if (!data) return <Loader />;

    const info = getSidebarInfo(data);
    const icon = getIconForRoom(data, styles.courseIcon, 40);

    return (
        <main>
            <Head>
                <title>Cobalt » {data.name}</title>
                <meta name="description" content={`View more information about ${data.name} on Cobalt.`} />
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>{icon}{data.name.trim()}</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            { BuildingCode[data.building.code] }
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
                                                {/* add `shadow` class to give back shadow to the below node */}
                                                <div className={styles.tabBody}>
                                                    <div className={styles.tabBody}>
                                                        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-chalkboard-teacher fa-fw"></i> Overview</pre>
                                                        <p className={`${styles.description}`}>
                                                            <b>Seating:</b> {SeatingType[data.seatingType]}<br/>
                                                            <b>Board:</b> {BoardType[data.boardType]}<br/>
                                                            <b>Technology:</b> {TechType[data.techType]}<br/>
                                                            {data.techDescription && <><b>Installed Tech:</b> {data.techDescription}<br/></>}
                                                            <b>Lecture Capture:</b> {LectureCaptureType[data.lectureCapture]}<br/><br/>
                                                            <Link href={`/buildings#${data.building.code}`}>
                                                                <a className="text-primary-light shine">
                                                                    <i className="fa fa-link fa-fw"></i> View more information about <b className="">{data.building.name}</b>.
                                                                </a>
                                                            </Link>
                                                        </p>
                                                        
                                                        {/* <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-file-code fa-fw"></i> Raw Data</pre>
                                                        <pre className={styles.description}>{JSON.stringify(data, null, 3)}</pre><br/> */}
                                                        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-camera-retro fa-fw"></i> 360&#176; View</pre>
                                                        { rendered && <ThreeSixtyRenderer src={data.threeSixtyView} height={500} timeAnim={false} /> }
                                                        { data.liveStreamUrl &&
                                                            (
                                                                <>
                                                                    <br/>
                                                                    <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-broadcast-tower fa-fw"></i> Live Stream</pre>
                                                                    <iframe src={data.liveStreamUrl} height={500} width={'100%'} ></iframe>
                                                                </>
                                                            )
                                                        }
                                                        <br/>
                                                    </div>
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
    
export default ClassroomInspection;