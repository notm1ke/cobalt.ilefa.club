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

import Link from 'next/link';
import dynamic from 'next/dynamic';

import styles from '../../styling/inspection.module.css';

import { useEffect, useState } from 'react';
import { RoomInspectionPayload } from '../../../hooks';
import { capitalizeFirst, RoomImageMode } from '../../../util';
import { BoardType, LectureCaptureType, SeatingType, TechType } from '@ilefa/husky';

const ReactPhotoSphereViewer = dynamic(() => import('react-photo-sphere-viewer').then(module => module.ReactPhotoSphereViewer), { ssr: false });

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
                <Link href={`/buildings/${room.building.code}`}>
                    <a className="text-primary-light shine">
                        <i className="fa fa-link fa-fw"></i> View more information about <b>{room.building.name}</b>.
                    </a>
                </Link>
            </p>

            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-camera-retro fa-fw"></i> {imageMode === RoomImageMode.THREE_SIXTY ? <>360&#176; View</> : <>Room Image</>}</pre>
            { !room.threeSixtyView && <p className={`${styles.description} mb--3`}>No images are available for <b>{styledName}</b>.</p> }
            { room.threeSixtyView && imageMode === RoomImageMode.STATIC && <img src={room.threeSixtyView} height={500} /> }
            { room.threeSixtyView && imageMode === RoomImageMode.THREE_SIXTY && rendered && (
                <ReactPhotoSphereViewer
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