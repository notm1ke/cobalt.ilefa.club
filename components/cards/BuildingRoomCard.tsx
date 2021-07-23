import Link from 'next/link';
import styles from '../styling/building.module.css';
import cardStyles from '../styling/card.module.css';

import { capitalizeFirst, getIconForRoom } from '../../util';
import { BoardType, Classroom, SeatingType, TechType } from '@ilefa/husky';

export interface BuildingRoomCardProps {
    room: Classroom;
    iconColor?: string;
}

export const BuildingRoomCard: React.FC<BuildingRoomCardProps> = props => {
    let icon = getIconForRoom(props.room, '', 20);
    let room = props.room;
    let prettyName = room.building.code + ' ' + room.name.split(room.building.code)[1];

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <Link href={`/room/${room.name}`}>
                                <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                    {icon ?? ''} {room.building.name} {room.name.split(room.building.code)[1]}
                                </a>
                            </Link>
                        </h5>

                        <p className="text-dark">
                            <b>{prettyName}</b> can seat <b>{room.capacity.full} {room.capacity.full === 1 ? 'person' : 'people'}</b>.
                        </p>
                        
                        <p className="text-dark mb-4">
                            <b>Technical Facts:</b>
                            <ul>
                                <li><b>Seating:</b> {SeatingType[room.seatingType]}</li>
                                <li><b>Air Conditioning:</b> {room.airConditioned ? 'Yes' : 'No'}</li>
                                <li><b>Board:</b> {BoardType[room.boardType]}</li>
                                <li><b>Tech:</b> {TechType[room.techType]}</li>
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
                            <Link href={`/room/${room.name}`}>
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