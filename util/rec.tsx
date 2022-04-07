import { DAYLIGHT_SAVINGS, getDateFromTime } from '.';

export type RecHourEntry = {
    start: string;
    end: string;
    days: number[];
}

export enum RecFacility {
    SRC = 'Recreation Center',
    AQUATIC = 'Aquatic Center',
    CLIMB = 'Climbing Center',
    ADV = 'Adventure Center',
    ADMIN = 'Admin Offices'
}

const Weekdays = [1, 2, 3, 4, 5];
const Weekends = [0, 6];
const AllDays = [...Weekdays, ...Weekends];

export const StandardRecHours: Record<keyof typeof RecFacility, RecHourEntry[]> = {
    'SRC': [
        { start: '6:00am', end: '10:00pm', days: Weekdays },
        { start: '8:00am', end: '7:00pm', days: [6] },
        { start: '10:00am', end: '10:00pm', days: [0] }
    ],
    'AQUATIC': [
        { start: '6:00am', end: '8:30am', days: Weekdays },
        { start: '10:00am', end: '2:00pm', days: AllDays },
        { start: '4:00pm', end: '7:00pm', days: AllDays }
    ],
    'CLIMB': [
        { start: '12:00pm', end: '10:00pm', days: Weekdays.slice(0, 4) },
        { start: '12:00pm', end: '8:00pm', days: [5] },
        { start: '12:00pm', end: '4:00pm', days: [6] },
        { start: '6:00pm', end: '10:00pm', days: [0] }
    ],
    'ADV': [
        { start: '11:00am', end: '6:00pm', days: Weekdays },
        { start: '10:00am', end: '2:00pm', days: Weekends }
    ],
    'ADMIN': [
        { start: '9:00am', end: '5:00pm', days: Weekdays }
    ]
}

export const getRecStatus = (facility: keyof typeof RecFacility, now = new Date()) => {
    let date = new Date();
    let validatedDate = now
        ? new Date(now)
        : date;
    
    let customDate = date.getTime() !== validatedDate.getTime();
    if (!customDate && validatedDate.getTimezoneOffset() === 0) {
        validatedDate.setHours(validatedDate.getHours() - 4);
        DAYLIGHT_SAVINGS && validatedDate.setHours(validatedDate.getHours() - 1);
    }

    const hours = StandardRecHours[facility];
    const day = validatedDate.getDay();
    const time = validatedDate.getHours();
    const isOpen = hours
        .filter(({ days }) => days.includes(day))
        .map(ent => {
            let start = getDateFromTime(ent.start);
            let end = getDateFromTime(ent.end);
            return time >= start.getHours() && time < end.getHours();
        })
        .reduce((acc, cur) => acc || cur, false);

    return isOpen;
}

export const getTimeUntilRecClose = (facility: keyof typeof RecFacility, now = new Date()) => {
    const hours = StandardRecHours[facility];
    const day = now.getDay();
    const time = now.getHours();
    const isOpen = hours.some(({ days }) => {
        if (days.includes(day)) {
            const start = parseInt(hours[0].start.slice(0, 2));
            const end = parseInt(hours[0].end.slice(0, 2));
            return time >= start && time < end;
        }
        return false;
    });

    if (isOpen) return parseInt(hours[0].end.slice(0, 2)) - time;
    return 0;
}

export const getAllStatuses = (now = new Date()) => {
    const statuses: Record<keyof typeof RecFacility, boolean> = {} as any;
    Object.keys(StandardRecHours).forEach(facility => {
        statuses[facility] = getRecStatus(facility as keyof typeof RecFacility, now);
    });

    return statuses;
}