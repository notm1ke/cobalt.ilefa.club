import ThreeSixtyRenderer from 'react-photosphere';
import styles from '../../styling/inspection.module.css';

import { useEffect, useState } from 'react';
import { RoomInspectionPayload } from '../../../hooks';
import { capitalizeFirst, RoomImageMode } from '../../../util';
import { BoardType, BuildingCode, LectureCaptureType, SeatingType, TechType } from '@ilefa/husky';
import { BuildingOverviewModal } from './BuildingOverviewModal';

export interface RoomOverviewTabProps {
    room: RoomInspectionPayload;
    imageMode?: RoomImageMode | undefined | null;
    styledName: string;
}

export const RoomOverviewTab: React.FC<RoomOverviewTabProps> = ({ room, imageMode, styledName }) => {
    const [rendered, setRendered] = useState(false);
    const [buildingModal, setBuildingModal] = useState(false);

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
                {room.techDescription && <><b>Installed Tech:</b> {room.techDescription}<br/></>}
                <b>Lecture Capture:</b> {LectureCaptureType[room.lectureCapture]}<br/><br/>
                <span className="text-primary-light shine pointer" onClick={() => setBuildingModal(true)}>
                    <i className="fa fa-link fa-fw"></i> View more information about <b className="">{room.building.name}</b>.
                </span>
                <BuildingOverviewModal
                    buildingType={room.building.code as keyof typeof BuildingCode}
                    open={buildingModal}
                    setOpen={setBuildingModal} />
            </p>
            {/* <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-file-code fa-fw"></i> Raw Data</pre>
            <pre className={styles.description}>{JSON.stringify(data, null, 3)}</pre><br/> */}
            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-camera-retro fa-fw"></i> {imageMode === RoomImageMode.THREE_SIXTY ? <>360&#176; View</> : <>Room Image</>}</pre>
            { !room.threeSixtyView && <p className={`${styles.description} mb--3`}>No images are available for <b>{styledName}</b>.</p> }
            { room.threeSixtyView && imageMode === RoomImageMode.STATIC && <img src={room.threeSixtyView} height={500} /> }
            { room.threeSixtyView && imageMode === RoomImageMode.THREE_SIXTY && rendered && <ThreeSixtyRenderer src={room.threeSixtyView} height={500} timeAnim={false} /> }
            { room.liveStreamUrl &&
                (
                    <>
                        <br/>
                        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-broadcast-tower fa-fw"></i> Live Stream</pre>
                        <iframe src={room.liveStreamUrl} height={500} width={'100%'} ></iframe>
                    </>
                )
            }
            <br/>
        </div>
    )
}