import moment from 'moment';

import { Color, getEnumKeyByEnumValue } from '.';

import {
    DiningHall,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus
} from '@ilefa/blueplate';

export const DAYLIGHT_SAVINGS = false;

export type DiningHallPayload = DiningHall & {
    status: keyof typeof DiningHallStatus;
}

export enum DiningHallStatusOrdinal {
    BREAKFAST,
    LUNCH,
    BRUNCH,
    DINNER,
    LATE_NIGHT,
    BETWEEN_MEALS,
    CLOSED
}

export enum DiningHallMealHours {
    BREAKFAST = '7:30am - 10:30am',
    BREAKFAST_SOUTH_SAT = '7:00am - 9:30am',
    BREAKFAST_SOUTH_SUN = '8:00am - 9:30am',
    LUNCH = '11:00am - 2:15pm',
    BRUNCH = '10:30am - 2:15pm',
    DINNER = '4:15pm - 7:45pm',
    LATE_NIGHT = '7:45pm - 10:00pm',
    BETWEEN_MEALS = '2:15pm - 4:15pm',
}

export type MealHourEntry = {
    name: string;
    start: string;
    end: string;
    days: number[];
}

export type DateMealHourEntry = {
    name: string;
    start: Date;
    end: Date;
    days: number[];
}

export const Weekdays = [1, 2, 3, 4, 5];
export const Weekends = [0, 6];
export const AllDays = [...Weekdays, ...Weekends];

export const StandardMealHours: Record<keyof typeof DiningHallType, MealHourEntry[]> = {
    'BUCKLEY': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:30pm', days: Weekdays },
        { name: 'Between Meals', start: '2:30pm', end: '4:00pm', days: Weekdays },
        { name: 'Dinner', start: '4:00pm', end: '7:45pm', days: Weekdays }
    ],
    'PUTNAM': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:30pm', days: Weekdays },
        { name: 'Between Meals', start: '2:30pm', end: '4:00pm', days: AllDays },
        { name: 'Dinner', start: '4:00pm', end: '7:45pm', days: AllDays },
        { name: 'Brunch', start: '10:30am', end: '2:30pm', days: Weekends }
    ],
    'NORTHWEST': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:30pm', days: Weekdays },
        { name: 'Between Meals', start: '2:30pm', end: '4:00pm', days: AllDays },
        { name: 'Dinner', start: '4:00pm', end: '7:45pm', days: [1] },
        { name: 'Dinner', start: '4:00pm', end: '10:00pm', days: AllDays.filter(day => day !== 1) },
        { name: 'Brunch', start: '10:30am', end: '2:30pm', days: Weekends }
    ],
    'SOUTH': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:00pm', days: Weekdays },
        { name: 'Between Meals', start: '2:00pm', end: '3:30pm', days: AllDays },
        { name: 'Dinner', start: '3:30pm', end: '7:45pm', days: AllDays },
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: [6] },
        { name: 'Breakfast', start: '8:00am', end: '10:30am', days: [0] },
        { name: 'Brunch', start: '10:30am', end: '2:00pm', days: Weekends }
    ],
    'TOWERS': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:00pm', days: Weekdays },
        { name: 'Between Meals', start: '2:00pm', end: '3:30pm', days: Weekdays },
        { name: 'Dinner', start: '3:30pm', end: '7:45pm', days: Weekdays },
        { name: 'Breakfast', start: '9:30am', end: '10:30am', days: Weekends },
        { name: 'Brunch', start: '10:30am', end: '2:00pm', days: Weekends },
        { name: 'Between Meals', start: '2:00pm', end: '3:30pm', days: Weekends },
        { name: 'Dinner', start: '3:30pm', end: '7:45pm', days: Weekends }
    ],
    'NORTH': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '3:00pm', days: Weekdays },
        { name: 'Between Meals', start: '3:00pm', end: '4:30pm', days: AllDays },
        { name: 'Dinner', start: '4:30pm', end: '7:45pm', days: AllDays },
        { name: 'Brunch', start: '10:30am', end: '3:00pm', days: Weekends }
    ],
    'WHITNEY': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '3:00pm', days: Weekdays },
        { name: 'Between Meals', start: '3:00pm', end: '4:30pm', days: AllDays },
        { name: 'Dinner', start: '4:30pm', end: '7:45pm', days: AllDays },
        { name: 'Brunch', start: '10:30am', end: '3:00pm', days: Weekends }
    ],
    'MCMAHON': [
        { name: 'Breakfast', start: '7:00am', end: '10:30am', days: Weekdays },
        { name: 'Lunch', start: '10:45am', end: '2:15pm', days: Weekdays },
        { name: 'Between Meals', start: '2:15pm', end: '3:45pm', days: AllDays },
        { name: 'Dinner', start: '3:45pm', end: '7:45pm', days: [1] },
        { name: 'Dinner', start: '3:45pm', end: '10:00pm', days: AllDays.filter(day => day !== 1) },
        { name: 'Brunch', start: '10:30am', end: '2:15pm', days: Weekends }
    ]
}

export const getDiningHallStatusName = (name: string) => {
    if (name === 'Between Meals')
        return 'currently resetting';

    if (name === 'Closed')
        return 'currently closed';

    return <>serving <b>{name}</b></>;
}

/**
 * Returns a color to represent the status of a dining hall.
 * @param hall the dining hall to get the status of
 */
export const getDiningHallStatusColor = (status: keyof typeof DiningHallStatus): Color => {
    console.log(status);
    if (!status)
        return 'purple';

    switch (status) {
        case 'BREAKFAST':
        case 'BRUNCH':
        case 'LUNCH':
        case 'DINNER':
            return 'success';
        case 'LATE_NIGHT':
            return 'primary';
        case 'BETWEEN_MEALS':
            return 'orange';
        case 'CLOSED':
            return 'danger';
        default: 
            return 'purple';
    }
}

/**
 * Returns a DDS link for the given dining hall / date.
 * 
 * @param hall the dining hall to get the url for
 * @param date the date of the menu
 */
export const generateDdsLink = (hall: DiningHall, date = new Date()) => {
    let url = `http://nutritionanalysis.dds.uconn.edu/shortmenu.aspx?sName=UCONN+Dining+Services&locationNum=${hall.location.id}&locationName=${hall.location.name}&naFlag=1`;
    if (date.getMonth() !== new Date().getMonth()
        || date.getFullYear() !== new Date().getFullYear()
        || date.getDate() !== new Date().getDate())
            url += `&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=${moment(date).format('MM')}%2f${date.getDate()}%2f${date.getFullYear()}`;

    return url;
}

/**
 * Returns the dining hours for a specified dining hall,
 * and with an optional custom date.
 * 
 * Note: If providing a custom date, you must provide
 * the dining hall status you want to lookup. This is
 * because simply providing the dining hall/date will
 * try to fetch the status at that datetime.
 * 
 * @param hall the dining hall to get meal hours for
 * @param date the date/time to retrieve meal hours for
 */
export const getMealHours = (hall: keyof typeof DiningHallType, date = new Date(), status?: keyof typeof DiningHallStatus) => {
    let mealStatus = status ?? getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall])) as keyof typeof DiningHallStatus;
    if (!status) return null;

    if (hall === 'SOUTH' && mealStatus === 'BREAKFAST' && (date.getDay() === 0 || date.getDay() === 6))
        return date.getDay() === 0 ? DiningHallMealHours.BREAKFAST_SOUTH_SUN : DiningHallMealHours.BREAKFAST_SOUTH_SAT;

    return DiningHallMealHours[status];
}

/**
 * Returns whether the given input string is a
 * valid dining hall type.
 * 
 * @param str the inputted string
 */
export const isDiningHallType = (str: string): str is keyof typeof DiningHallType => {
    return Object
        .keys(DiningHallType)
        .includes(str as DiningHallType);
}