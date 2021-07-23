import React from 'react';
import Head from 'next/head';
import MdiIcon from '@mdi/react';

import styles from '../components/styling/building.module.css';
import globalStyles from '../components/styling/home.module.css';

import { useState } from 'react';
import { useBuildings } from '../hooks';
import { Footer, Nav } from '../components';
import { BuildingRoomCard } from '../components';
import { mdiInformation, mdiMapSearch } from '@mdi/js';

import {
    BuildingAddresses,
    BuildingDescriptions,
    BuildingMaps,
    getIconForBuilding
} from '../util';

const BuildingsPage = () => {
    const { data, isLoading, isError } = useBuildings();    
    const [hideNoRooms, setHideNoRooms] = useState(true);

    const toggleNoRooms = () => setHideNoRooms(!hideNoRooms);

    const enabled = !isLoading && !isError;

    return (
        <main>
            <Head>
                <title>Cobalt » Buildings</title>
                <meta name="description" content={`Explore various buildings around the UConn Storrs campus.`} />
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
                                        <h1 className={`${globalStyles.nameTitle} text-white display-1`}>Buildings</h1>
                                        <h2 className={`${globalStyles.tagline} display-4 font-weight-normal text-white mb-5`}>
                                            Various buildings around the Storrs campus
                                        </h2>
                                        <span className={`btn btn-white shine btn-icon mt-3 mb-sm-0 text-lowercase ${styles.hideNoRoomsButton}`} onClick={() => toggleNoRooms()}>
                                            { hideNoRooms ? 'show all buildings' : 'show buildings with rooms' }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={`section ${styles.buildingSection} background-circuits`}>
                    <div className="container" id="body">
                        {
                            isLoading && (
                                <h4 className={`text-white text-center display-5 mb-7`}>
                                    <i className="fa fa-spinner fa-spin fa-fw"></i> Loading..
                                </h4>
                            )
                        }

                        {
                            isError && (
                                <h4 className={`text-white text-center display-5 mb-7`}>
                                    <i className="fa fa-exclamation-circle fa-fw"></i> Something went wrong while retrieving data from the web.
                                </h4>
                            )
                        }

                        {
                            enabled && data
                                .buildings!
                                .filter(({ rooms }) => {
                                    if (hideNoRooms)
                                        return rooms.length > 0;
                                    return true;
                                })
                                .map(building => {
                                    let addr = BuildingAddresses[building.code];
                                    if (!addr) addr = 'NONE';

                                    let atOn = isNaN(parseFloat(addr.substring(0, 1))) ? 'on' : 'at';
                                    return (
                                        <h4 className={`text-white ${styles.buildingSectionTitle} mb-7`} id={building.code} key={building.code}>
                                            { getIconForBuilding(building.code as any, styles.buildingIcon, 24) } {building.name} ({building.code})
                                            <br/><span className={`text-white ${styles.buildingSectionBody}`}>
                                                The <b>{building.rooms.length ? building.rooms[0].building.name : building.name}</b> Building {addr === 'NONE' ? 'does not have an address' : <>is located {atOn} <a href={BuildingMaps[building.code]} className={`text-light ${styles.buildingLink} shine`} target="_blank" rel="noopener noreferrer">{BuildingAddresses[building.code]}</a></>}.
                                                <br/>
                                                {BuildingDescriptions[building.code] || 'This building does not have a description.'}
                                                <br/>
                                                <a href={BuildingMaps[building.code]} className="btn btn-white shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                                    <span className="btn-inner--icon"><MdiIcon path={mdiMapSearch} size="20px" /></span>
                                                    <span className="btn-inner--text">View on Google Maps</span>
                                                </a>
                                                <a href={`https://maps.uconn.edu/m/info/${building.code}`} className="btn btn-white shine btn-icon mt-4 mb-2 text-lowercase" target="_blank" rel="noopener noreferrer">
                                                    <span className="btn-inner--icon"><MdiIcon path={mdiInformation} size="20px" /></span>
                                                    <span className="btn-inner--text">Information</span>
                                                </a>
                                                <div className="row">
                                                    {
                                                        building.rooms.map(room => (
                                                            <div className="col-md-4" key={room.name}>
                                                                <BuildingRoomCard room={room} key={room.name} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </span>
                                        </h4>
                                    )
                                })
                        }
                    </div>
                </section>
                <Footer className="background-circuits" white />
            </div>
        </main>
    );
}

export default BuildingsPage;
