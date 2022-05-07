/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import Link from 'next/link';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';

import {
    BoardType,
    BuildingCode,
    Classroom,
    TechType
} from '@ilefa/husky';

import {
    capitalizeFirst,
    getIconForRoom,
    getRealRoomCode,
    getRoomNumber,
    ShortenedSeatingType
} from '../../util';

export interface BuildingRoomCardProps {
    room: Classroom;
}

export const BuildingRoomCard: React.FC<BuildingRoomCardProps> = ({ room }) => {
    let icon = getIconForRoom(room, '', 20);
    let shortName = getRealRoomCode(room.name, room.building.code) + ' ' + getRoomNumber(room.name, room.building.code);
    let name = BuildingCode[room.building.code] + ' ' + getRoomNumber(room.name, room.building.code);
    if (name.length > 18) name = room.building.code + ' ' + getRoomNumber(room.name, room.building.code);

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/room/${room.name}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {name}
                                </a>
                            </Link>
                        </h5>

                        <p className="text-dark">
                            <b>{shortName}</b> can seat <b>{room.capacity.full} {room.capacity.full === 1 ? 'person' : 'people'}</b>.
                        </p>
                        
                        <p className="text-dark mb-4">
                            <b>Technical Facts:</b>
                            <ul className={styles.technicalFacts}>
                                <li><b>Seating:</b> {ShortenedSeatingType[room.seatingType || 'UNKNOWN']}</li>
                                <li><b>Air Conditioning:</b> {room.airConditioned ? 'Yes' : 'No'}</li>
                                <li><b>Board:</b> {BoardType[room.boardType || 'UNKNOWN']}</li>
                                <li><b>Tech:</b> {TechType[room.techType || 'UNKNOWN']}</li>
                                <li><b>Livestream:</b> {" "}
                                    {
                                        room.liveStreamUrl
                                            ? <a href={room.liveStreamUrl} target="_blank" rel="noopener noreferrer" className="text-primary shine font-weight-500">
                                                    <i className={`fa fa-external-link-alt fa-fw ${styles.liveStreamButton}`}></i> Click here</a>
                                            : <span className="text-danger">
                                                    <i className={`fa fa-times-circle fa-fw ${styles.liveStreamButton}`}></i> None
                                              </span>
                                    }
                                </li>
                                <li><b>Lecture Capture:</b> {capitalizeFirst((room.lectureCapture as string).toLowerCase())}</li>
                            </ul>
                        </p>
                        <div className={styles.projectCardLink}>
                            <Link href={`/room/${room.building.code + room.room}`}>
                                <a className="btn btn-dark btn-sm text-lowercase shine">
                                    <i className="fa fa-search fa-fw mr-1"></i> see more information
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}