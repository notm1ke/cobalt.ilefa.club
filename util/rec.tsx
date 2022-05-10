/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

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

const START_DATES = ["2/6/2022", "1/31/2022", "2/1/2022", "2/2/2022", "2/3/2022", "2/4/2022", "2/5/2022"];

export const SUMMER_HOURS = true;

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

export const SummerRecHours: Record<keyof typeof RecFacility, RecHourEntry[]> = {
    'SRC': [
        { start: '8:00am', end: '6:00pm', days: Weekdays },
        { start: '8:00am', end: '2:00pm', days: Weekends }
    ],
    'AQUATIC': [
        { start: '8:00am', end: '9:30am', days: Weekdays },
        { start: '11:00am', end: '1:00pm', days: AllDays },
        { start: '3:30pm', end: '5:30pm', days: Weekdays },
    ],
    'CLIMB': [{ start: '12:00pm', end: '6:00pm', days: Weekdays }],
    'ADV': [{ start: '12:00am', end: '5:00pm', days: Weekdays }],
    'ADMIN': []
}

/**
 * Returns the current status a given recreational facility.
 * 
 * @param facility the facility to query status for
 * @param now the time to query status for; defaults to now
 */
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

    const hours = SUMMER_HOURS ? SummerRecHours[facility] : StandardRecHours[facility];
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

/**
 * Attempts to return the time until a given recreational facility closes.
 * 
 * @param facility the facility to query status for
 * @param now the time to query status for; defaults to now
 */
export const getTimeUntilRecClose = (facility: keyof typeof RecFacility, now = new Date()) => {
    const hours = SUMMER_HOURS ? SummerRecHours[facility] : StandardRecHours[facility];
    const day = now.getDay();
    const time = now.getHours();
    const statuses = hours
        .filter(({ days }) => days.includes(day))
        .map(ent => {
            let start = getDateFromTime(ent.start);
            let end = getDateFromTime(ent.end);
            return { status: time >= start.getHours() && time < end.getHours(), end: end.getTime() };
        });

    let isOpen = statuses.reduce((acc, cur) => acc || cur.status, false);
    if (isOpen) return statuses.find(e => e.status)!.end - now.getTime();

    return 0;
}

/**
 * Returns statuses for all recreational facilities.
 * @param now the time to query status for; defaults to now
 */
export const getAllStatuses = (now = new Date()) => {
    const statuses: Record<keyof typeof RecFacility, boolean> = {} as any;
    Object.keys(SUMMER_HOURS ? SummerRecHours : StandardRecHours).forEach(facility => {
        statuses[facility] = getRecStatus(facility as keyof typeof RecFacility, now);
    });

    return statuses;
}

/**
 * Returns whether all facilities are closed.
 */
export const isRecClosed = () => {
    const statuses = getAllStatuses();
    return Object.keys(statuses).every(facility => !statuses[facility]);
}

export const getRecDayOffset = (date = new Date()) => {
    let oneDay = 24 * 60 * 60 * 1000;
    let start = new Date(START_DATES[date.getDay()]);
    let diff = Math.round(Math.abs((start.getTime() - date.getTime()) / oneDay));
    
    return Math.floor(diff / 7);
}