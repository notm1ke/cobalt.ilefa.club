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
import Head from 'next/head';

import styles from '../../components/styling/inspection.module.css';
import globalStyles from '../../components/styling/home.module.css';

import { useRouter } from 'next/router';
import { BuildingCode } from '@ilefa/husky';
import { Card, CardBody } from 'reactstrap';
import { getIconForRoom, RoomImageMode } from '../../util';
import { RoomInspectionPayload, useRoom } from '../../hooks';

import {
    ErrorView,
    Footer,
    Loader,
    Nav,
    RoomOverviewTab,
    RoomSidebar
} from '../../components';

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

    if (loading) return <Loader />;
    if (error) return <ErrorView title="Error" message="Something went wrong while retrieving data." />;
    if (!room) return <Loader />;

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
                                    <RoomSidebar room={room} />
                                    <div className="col-lg-9">
                                        <Card className="shadow border-0">
                                            <CardBody className="pt-0">
                                                <div className={styles.tabBody}>
                                                    <RoomOverviewTab
                                                        room={room}
                                                        imageMode={imageMode}
                                                        styledName={styledName} />
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