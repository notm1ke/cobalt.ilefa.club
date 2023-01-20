/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import dynamic from 'next/dynamic';
import styles from '../../styling/inspection.module.css';

import { useEffect, useState } from 'react';
import { RoomInspectionPayload } from '../../../hooks';
import { capitalizeFirst, RoomImageMode } from '../../../util';
import { BoardType, LectureCaptureType, SeatingType, TechType } from '@ilefa/husky';

// @ts-ignore
const RSphereViewer: any = dynamic(() => import('react-photo-sphere-viewer').then(module => module.ReactPhotoSphereViewer), { ssr: false });

export interface RoomOverviewTabProps {
    room: RoomInspectionPayload;
    imageMode?: RoomImageMode | undefined | null;
    styledName: string;
}

export const RoomOverviewTab: React.FC<RoomOverviewTabProps> = ({ room, imageMode, styledName }) => {
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRendered(true);
        }

        return () => setRendered(false);
    }, []);

    return (
        <div className={styles.tabBody}>
            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-chalkboard-teacher fa-fw"></i> Overview</pre>
            <p className={`${styles.description}`}>
                <b>Campus:</b> {capitalizeFirst(room.building.campus.toLowerCase())}<br/>
                <b>Seating:</b> {SeatingType[room.seatingType || 'UNKNOWN']}<br/>
                <b>Board:</b> {BoardType[room.boardType || 'UNKNOWN']}<br/>
                <b>Technology:</b> {TechType[room.techType]}<br/>
                { room.techDescription && <><b>Installed Tech:</b> {room.techDescription}<br/></> }
                
                <b>Lecture Capture:</b> {LectureCaptureType[room.lectureCapture]}<br/><br/>
                <a href={`/buildings/${room.building.code}`} className="text-primary-light shine">
                    <i className="fa fa-link fa-fw"></i> View more information about <b>{room.building.name}</b>.
                </a>
            </p>

            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-camera-retro fa-fw"></i> {imageMode === RoomImageMode.THREE_SIXTY ? <>360&#176; View</> : <>Room Image</>}</pre>
            { !room.threeSixtyView && <p className={`${styles.description} mb--3`}>No images are available for <b>{styledName}</b>.</p> }
            { room.threeSixtyView && imageMode === RoomImageMode.STATIC && <img src={room.threeSixtyView} height={500} /> }
            { room.threeSixtyView && imageMode === RoomImageMode.THREE_SIXTY && rendered && (
                <RSphereViewer
                    src={room.threeSixtyView}
                    height={500}
                    width={722}
                    littlePlanet={false}
                    container="div"
                />
            ) }
            { room.liveStreamUrl &&
                (
                    <>
                        <br/>
                        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-broadcast-tower fa-fw"></i> Live Stream</pre>
                        <iframe src={room.liveStreamUrl} height={500} width="100%" ></iframe>
                    </>
                )
            }
            <br/>
        </div>
    )
}