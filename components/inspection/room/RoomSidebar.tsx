import moment from 'moment';
import styles from '../../styling/inspection.module.css';

import { DataView } from '../../';
import { ScheduleEntry } from '@ilefa/bluesign';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { BluesignResponsePayload, useBluesign } from '../../../hooks';
import { capitalizeFirst, CompleteRoomPayload, getDateFromTime, getLatestTimeValue } from '../../../util';
import { COURSE_IDENTIFIER } from '@ilefa/husky';

export interface RoomSidebarProps {
    room: CompleteRoomPayload;
}

type SidebarEntry = {
    icon: string;
    name: string;
    marginTop?: string;
    contents: SidebarEntryContents[];
}

type SidebarEntryContents = {
    key: string;
    name: string | JSX.Element;
    value: string | number | JSX.Element;
}

type CustomScheduleEntry = ScheduleEntry & {
    startDate: Date;
    endDate: Date;
}

type CurrentAndNextEvents = [CustomScheduleEntry | undefined, CustomScheduleEntry[] | undefined, boolean];

const needsEllipses = (event: string, limit: number) => event.length > limit;

const getShortenedName = ({ event }: CustomScheduleEntry, limit: number) => {
    let capitalized = capitalizeFirst(event);
    if (needsEllipses(event, limit))
        return capitalized.substring(0, limit) + '..';
    return capitalized;
}

const getRoomStatus = (room: CompleteRoomPayload, schedule: BluesignResponsePayload) => {
    let events = schedule
        .entries
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return current ?
                <span className="text-dark">
                    <div><span className={styles.pulsatingCircle}></span></div>
                    <div className={styles.pulsatingCircleSeparator}>
                        <b className={`text-success ${styles.roomScheduleStatus}`}> {getShortenedName(current, 12)}</b> for next <span className="text-purple">{getLatestTimeValue(current.endDate.getTime() - Date.now())}</span>.
                    </div>
                </span>
            : next.length ?
                <span className="text-dark">
                    <b className={`text-warning ${styles.roomScheduleStatus}`}><i className="fa fa-clock fa-fw"></i> {getShortenedName(next[0], 20)}</b> {moment(next[0].startDate).fromNow()}
                </span>
            : <span className="text-dark">
                <b className={`text-success ${styles.roomScheduleStatus}`}><i className="fas fa-calendar-check fa-fw"></i> {room.name}</b> is free.
            </span>;
}

const getCurrentAndNextEvents = (schedule?: BluesignResponsePayload): CurrentAndNextEvents => {
    if (!schedule)
        return [undefined, undefined, false];

    let events = schedule
        .entries
        .map(ent => ({
            ...ent,
            startDate: getDateFromTime(ent.start),
            endDate: getDateFromTime(ent.end)
        }));

    let current = events.find(e => e.startDate.getTime() <= Date.now() && e.endDate.getTime() >= Date.now());
    let next = events.filter(e => e.startDate.getTime() > Date.now());

    return [current, next, true];
}

const getColorForScheduleEntry = (entry: CustomScheduleEntry, events: CurrentAndNextEvents): 'text-dark' | 'text-success' | 'text-warning' => {
    const [current, next, available] = events;
    if (!available)
        return 'text-dark';

    if (!current || !next || !next.length)
        return 'text-dark';

    if (current && entry.event === current.event && entry.section === current.section)
        return 'text-success';

    if (next && next[0] && next[0].event === entry.event && entry.section === next[0].section)
        return 'text-warning';

    return 'text-dark';
}

const getSidebarInfo = (data: CompleteRoomPayload, state: 'loaded' | 'loading' | 'error', schedule?: BluesignResponsePayload): SidebarEntry[] => {
    const events = getCurrentAndNextEvents(schedule);

    return [
        {
            icon: 'fa fa-door-open',
            name: 'Room Status',
            contents: [
                {
                    name: state !== 'loaded' ? 'Loading..' : getRoomStatus(data, schedule!),
                    key: 'status',
                    value: ''
                },
            ]
        },
        {
            icon: 'fa fa-calendar-day',
            name: 'Class Schedule',
            marginTop: '0',
            contents: state === 'loaded'
                ? schedule && schedule.entries.length
                    ? schedule
                        .entries
                        .filter(entry => entry.section && COURSE_IDENTIFIER.test(entry.event.replace(/\s/, '')))
                        .map(entry => ({
                            ...entry,
                            startDate: getDateFromTime(entry.start),
                            endDate: getDateFromTime(entry.end)
                        }))
                        .map(entry => ({
                            name: <>
                                <a href={`/course/${entry.event.replace(/\s/g, '')}`} className={`${getColorForScheduleEntry(entry, events)} font-weight-bold`} id={`room-event-${entry.event.replace(/\s/g, '')}-${entry.section}`}>{entry.event}</a>
                                <UncontrolledTooltip target={`room-event-${entry.event.replace(/\s/g, '')}-${entry.section}`}>
                                    <b>{entry.event} ({entry.section})</b>
                                    <br />Click to view information about this course.
                                </UncontrolledTooltip>
                            </>,
                            key: entry.event,
                            value: `${entry.start} - ${entry.end}`     
                        }))
                    : [{ name: <><b>{data.name}</b> has nothing scheduled.</>, key: 'noEvents', value: '' }]
                : state === 'loading'
                    ? [{ name: <><i className="fa fa-spinner fa-spin fa-fw font-weight-bold"></i> Loading..</>, key: 'pending', value: '' }]
                    : [{ name: <><i className="fa fa-times-circle fa-fw text-danger font-weight-bold"></i> Error loading room schedule</>, key: 'errored', value: '' }]
        },
        {
            icon: 'fa fa-users',
            name: 'Capacity',
            contents: [
                {
                    name: 'COVID-19',
                    key: 'covid',
                    value: data.capacity.covid.toLocaleString()
                },
                {
                    name: 'Regular',
                    key: 'regular',
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
                    key: 'airConditioned',
                    value: generateAmenityBadge(data.airConditioned)
                },
                {
                    name: 'BYOD Testing',
                    key: 'byod',
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
                    key: 'shareContent',
                    value: generateAmenityBadge(data.videoConference?.attributes.shareContent)
                },
                {
                    name: 'Instructor-facing Camera',
                    key: 'instructorCamera',
                    value: generateAmenityBadge(data.videoConference?.attributes.instructorFacingCamera)
                },
                {
                    name: 'Student-facing Camera',
                    key: 'studentCamera',
                    value: generateAmenityBadge(data.videoConference?.attributes.studentFacingCamera)
                },
                {
                    name: 'Present Media in Front',
                    key: 'presentMedia',
                    value: generateAmenityBadge(data.videoConference?.attributes.presentMediaFrontOfRoom)
                },
                {
                    name: 'Present Media in Rear',
                    key: 'presentMediaRear',
                    value: generateAmenityBadge(data.videoConference?.attributes.presentMediaBackOfRoom)
                },
                {
                    name: 'Instructor Microphone',
                    key: 'instructorMicrophone',
                    value: generateAmenityBadge(data.videoConference?.attributes.instructorMicrophone)
                },
                {
                    name: 'Student Microphone(s)',
                    key: 'studentMicrophone',
                    value: generateAmenityBadge(data.videoConference?.attributes.studentMicrophone)
                },
                {
                    name: 'Webex Capability',
                    key: 'webexCapability',
                    value: generateAmenityBadge(data.videoConference?.attributes.connectToWebex)
                },
            ]
        },
    ]
};

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

export const RoomSidebar: React.FC<RoomSidebarProps> = ({ room }) => {
    let name = room.name.split(room.room)[0] + ' ' + room.room;
    const [schedule, _req, loading, error] = useBluesign({ room: name });
    
    if (loading) return renderSidebar(getSidebarInfo(room, 'loading'));
    if (error) return renderSidebar(getSidebarInfo(room, 'error'));
    
    return renderSidebar(getSidebarInfo(room, 'loaded', schedule!));
}

const renderSidebar = (sidebar: SidebarEntry[]) => (
    <div className={`col-lg-3 ${styles.pr0}`}>
        <div className="card shadow border-0">
            <div className="card-body py-10">
                {
                    sidebar.map(entry => 
                        <>
                            <div key={entry.name}>
                                <pre className={`font-weight-500 mt-${entry.marginTop ? entry.marginTop : 3} mb-2 ${styles.statisticSection} text-primary`}><i className={entry.icon + " fa-fw text-primary"}></i> {entry.name}</pre>
                                {
                                    entry.contents.map(ent => <DataView key={ent.key} name={ent.name} value={ent.value} divider={!!ent.value} />)
                                }
                                <div className={styles.horizontalDivider}></div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </div>
)