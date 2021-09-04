import useSWR from 'swr';
import * as Logger from './logger';

import { UncontrolledTooltip } from 'reactstrap';

import {
    CampusType,
    Classroom,
    COURSE_IDENTIFIER,
    ProfessorData,
    SectionData,
    UConnService,
    UConnServiceStatus
} from '@ilefa/husky';

export * from './dorms';
export * from './icons';
export * from './buildings';

export type Color = 'blue'
                  | 'indigo'
                  | 'purple'
                  | 'pink'
                  | 'red'
                  | 'orange'
                  | 'yellow'
                  | 'green'
                  | 'teal'
                  | 'cyan'
                  | 'white'
                  | 'gray'
                  | 'gray-dark'
                  | 'light'
                  | 'lighter'
                  | 'primary'
                  | 'secondary'
                  | 'success'
                  | 'info'
                  | 'warning'
                  | 'danger'
                  | 'light'
                  | 'dark'
                  | 'default'
                  | 'primary-light'
                  | 'warp'
                  | 'red'
                  | 'dark-red'
                  | 'blue'
                  | 'yellow'
                  | 'white'
                  | 'neutral'
                  | 'darker';

export type TimedRequest = {
    timings: number;
}

export type MetricsEvent = {
    request: string;
    success: boolean;
    time: number;
    data?: any;
}

export interface IMetricsComponent {
    recordMetric: (event: MetricsEvent) => void;
}

export type UnshapedApiResponse = {
    message?: string;
}

export type GenericShapedHook = any[];

export type DefaultShapedHook<T extends UnshapedApiResponse> = [
    T | null, // data
    string,   // request url
    boolean,  // loading
    boolean   // error
];

export enum ApiResponseType {
    LOADING,
    ERROR,
    SUCCESS
}

export type CustomUConnServiceReport = {
    service: string;
    display: string;
    status: UConnServiceStatus;
    time: number;
}

export const CustomUConnServices = [
    ...Object
        .keys(UConnService)
        .map(key => key.toLowerCase())
        .filter(key => key !== 'unknown'),
    'catalog',
    'phonebook',
];

export type CustomUConnServiceString = 'aurora'
                                     | 'email'
                                     | 'huskyct'
                                     | 'kfs'
                                     | 'netid'
                                     | 'network'
                                     | 'student_admin'
                                     | 'webex'
                                     | 'catalog'
                                     | 'phonebook';

export type CompleteCoursePayload = {
    name: string;
    catalogName: string;
    catalogNumber: string;
    attributes: CourseAttributes;
    grading: string;
    credits: number;
    prerequisites: string;
    description: string;
    sections: SectionData[];
    professors: ProfessorData[];
}

export type CourseAttributes = {
    lab: boolean;
    writing: boolean;
    quantitative: boolean;
    environmental: boolean;
    contentAreas: ContentArea[];
}

export enum ContentArea {
    CA1 = 'CA1',
    CA2 = 'CA2',
    CA3 = 'CA3',
    CA4 = 'CA4',
    CA4INT = 'CA4INT'
}

export enum ContentAreaNames {
    CA1 = 'Arts and Humanities',
    CA2 = 'Social Sciences',
    CA3 = 'Science and Technology',
    CA4 = 'Diversity and Multiculturalism',
    CA4INT = 'Diversity and Multiculturalism (International)'
}

export enum GradingTypeNames {
    GRADED = 'Graded',
    SATISFACTORY_UNSATISFACTORY = 'S/U',
    HONORS_CREDIT = 'Honors',
    REGISTERED = 'Registered'
}

export enum CampusSorting {
    STORRS,
    HARTFORD,
    STAMFORD,
    WATERBURY,
    AVERY_POINT
}

export enum RoomImageMode {
    THREE_SIXTY,
    STATIC
}

export const RMP_TAG_PROS = [
    'gives good feedback',
    'respected',
    'accessible outside class',
    'inspirational',
    'clear grading criteria',
    'hilarious',
    'amazing lectures',
    'caring',
    'extra credit',
    'would take again',
    'tests? not many'
];

export const RMP_TAG_CONS = [
    'lots of homework',
    'get ready to read',
    'participation matters',
    'skip class? you won\'t pass.',
    'graded by few things',
    'test heavy',
    'beware of pop quizzes',
    'lecture heavy',
    'so many papers',
    'tough grader'
];

export const ROOM_NAME_REGEX = /^[a-zA-Z]{1,}\d{2,}[a-zA-Z]*$/;
export const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
export const NO_PROTOCOL_URL_REGEX = /([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?/;

export type StatisticsQueryMode = 'full'
                                | 'courses'
                                | 'professors'
                                | 'rooms'
                                | 'buildings'
                                | 'assets';

export type RoomQueryMode = 'full' | 'name';
export type CompleteRoomPayload = Classroom & {
    building: {
        name: string;
        code: string;
        campus: string;
        mapUrl: string;
    }
}

export enum Modalities {
    WW = 'These classes never meet in person, nor are you expected to be available at any particular time for classroom instruction. These courses are taught asynchronously with no pre-assigned meeting times.',
    DL = 'These classes never meet in person, but you are expected to deliver instruction synchronously at the times for which the class is scheduled.',
    HB = 'These classes have both in-person and online components. Classes will not meet in person for all scheduled meetings. At least 25% of mandatory instruction for the class will occur in person.',
    HR = 'These classes have both in-person and online components. Classes will not meet in-person for all scheduled meetings. Less than 25% of mandatory instruction for the class will occur in person',
    SP = 'These classes will meet during all scheduled class times. However, groups of students in the class will alternate in-person and virtual attendance as designated by the instructor to maintain reduced density in classrooms.',
    IP = 'These classes will meet in person during all scheduled class times.',
    SL = 'This mode indicates a service learning class, with instruction times and locations to be determined by the instructor.',
    AR = 'These are meant for clinical placements, field placements, independent study, internships, and research hours. They do not require a classroom or meeting time but are considered to be in person.'
}

export enum ShortenedSeatingType {
    TABLES = "Tables",
    TABLES_AND_ARMCHAIRS = "Tables + Armchairs",
    TABLET_ARMCHAIRS = "Tablet Armchairs",
    FIXED_AUDITORIUM = "Fixed/Auditorium",
    FIXED_TABLES = "Fixed Seating Tables",
    FIXED_LEVELED_TABLES = "Leveled Tables",
    LAB_TABLES = "Lab Tables + Chairs",
    ACTIVE = "Active Learning",
    UNKNOWN = "Unknown"
}

export enum ServiceUrls {
    AURORA = 'https://aurora.uconn.edu',
    CATALOG = 'https://catalog.uconn.edu',
    EMAIL = '#',
    HUSKYCT = 'https://huskyct.uconn.edu',
    KFS = '#',
    NETID = 'https://netid.uconn.edu',
    NETWORK = '#',
    PHONEBOOK = 'https://phonebook.uconn.edu',
    STUDENT_ADMIN = 'https://studentadmin.uconn.edu',
    WEBEX = 'https://webex.com'
}

/**
 * Returns the display name for a given
 * custom service string.
 * 
 * @param custom the custom uconn service string
 */
export const getDisplayNameForService = (custom: CustomUConnServiceString) => {
    if (custom in Object.keys(UConnService))
        return UConnService[custom];

    switch (custom.toLowerCase()) {
        case 'catalog':
            return 'Course Catalog';
        case 'phonebook':
            return 'Phonebook';
        default:
            return capitalizeFirst(custom.toLowerCase());
    }
}

/**
 * Typeguard to verify that a string is a valid {@link CampusType}.
 * @param input the string to verify
 */
export const isValidCampus = (input: string): input is CampusType => {
    let lower = input.toLowerCase();
    return lower === 'any'
        || lower === 'storrs'
        || lower === 'hartford'
        || lower === 'stamford'
        || lower === 'waterbury'
        || lower === 'avery_point'
}

/**
 * Typeguard to verify that a string is a valid {@link RoomQueryMode}.
 * @param input the string to verify
 */
export const isValidRoomQueryMode = (input: string): input is RoomQueryMode => {
    let lower = input.toLowerCase();
    return lower === 'full' || lower === 'name';
}

/**
 * Typeguard to verify that a string is a valid {@link StatisticsQueryMode}.
 * @param input the string to verify
 */
export const isValidStatisticsQueryMode = (input: string): input is StatisticsQueryMode => {
    let lower = input.toLowerCase();
    return lower === 'full'
        || lower === 'courses'
        || lower === 'professors'
        || lower === 'rooms'
        || lower === 'buildings'
        || lower === 'assets';
}

/**
 * Returns the campus indicator for the provided
 * campus string.
 * 
 * @param campus the campus string
 */
export const getCampusIndicator = (campus: string) => {
    campus = campus.toLowerCase();
    if (campus === 'storrs') return 'S';
    if (campus === 'hartford') return 'H';
    if (campus === 'stamford') return 'Z';
    if (campus === 'waterbury') return 'W';
    if (campus === 'off-campus') return 'O';

    // apparently the campus string contains a weird space character
    if (campus.replace(/\s/, '') === 'averypoint')
        return 'A';

    return '?';
}

/**
 * Returns the modality indicator for the provided
 * modality string.
 * 
 * @param modality the modality string
 */
export const getModalityIndicator = (modality: string) => {
    modality = modality.toLowerCase();
    if (modality === 'online') return 'WW';
    if (modality === 'distance learning') return 'DL';
    if (modality === 'hybrid/blended') return 'HB';
    if (modality === 'hybrid/blended reduced seat time') return 'HR';
    if (modality === 'split') return 'SP';
    if (modality === 'in person') return 'IP';
    if (modality === 'service learning') return 'SL';
    if (modality === 'by arrangement') return 'AR';
    
    return '?';
}

/**
 * Returns the name of the last semester
 * depending on the current time.
 */
export const getLastSemester = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month >= 0 && month <= 4)
        return 'fall ' + (year - 1);
    return 'spring ' + year;
}

/**
 * Ensures a number exists, since simply doing ``!!int`` or ``int``
 * will not always work (namely with ``0``, since ``!!0`` is false).
 * 
 * @param int the number to check
 */
export const numberProvided = (int: number | undefined | null) => {
    return int !== null && int !== undefined && int !== NaN;
}

/**
 * Adds a trailing decimal to the end of a number
 * if it does not already have one, and returns
 * it as a string.
 * 
 * @param int the number to apply a trailing decimal to
 */
export const addTrailingDecimal = (int: number) => {
    if (!int)
        return null;

    if (!int.toString().includes('.'))
        return int.toString() + '.0';

    return int.toString();
}

/**
 * Returns a formatted meeting time for a course.
 * 
 * @param schedule the schedule payload provided for the course
 * @param location the location object for a course
 * @param showFirst [optional] only show the first meeting time
 * @param showFirstChar [optional] character to display if showFirst is true
 */
export const getMeetingTime = (schedule: string, location: { name: string }, showFirst?: boolean, showFirstChar?: string, asArray?: boolean): string | string[] => {
    if (schedule === '12:00am‑12:00am')
        return asArray
            ? ['No Meeting Time']
            : 'No Meeting Time';

    if (schedule.trim().length) {
        const cleanTime = (schedule: string) => {
            let copy = schedule.trim();
            copy = replaceAll(copy, 'Mo', 'M');
            copy = replaceAll(copy, 'We', 'W');
            copy = replaceAll(copy, 'Fr', 'F');
            return copy;
        }

        let split = schedule.trim().split(/<br\/*>/);
        if (split.length === 1)
            if (asArray)
                return [cleanTime(split.join(''))];
            else return cleanTime(split.join(''));

        if (showFirst)
            return cleanTime(split[0]) + (showFirstChar || '*');

        let copy = schedule.trim();
        copy = replaceAll(copy, /<br\/*>/, ' & ');
        copy = cleanTime(copy);

        if (asArray)
            return copy.split(' & ');

        return copy;
    }

    if (location.name === 'No Room Required - Online')
        return asArray
            ? ['No Meeting Time']
            : 'No Meeting Time';

    return asArray
        ? ['Unknown']
        : 'Unknown';
}

/**
 * Returns the meeting room(s) for a given string.
 * 
 * For example, rooms are sometimes given as "GP 104GP 107"
 * or simply as "ITE 134" depending on the course. This function
 * returns an array of all the rooms it finds, even if there is
 * only one room in the target string.
 * 
 * @param room the provided room string
 */
export const getMeetingRoom = (room: string) =>
    room
        .split(/([A-Z]{2,4}\s\d{1,4})/)
        .filter(str => !!str);

/**
 * Returns the room number for a given string.
 * 
 * This exists since Husky currently has some invalid
 * data for the rooms specifically in STRSWW (Storrs Hall Widmer Wing)
 * and WH (Wood Hall).
 * 
 * @param room the room string
 * @param buildingCode the building code for the room
 */
export const getRoomNumber = (room: string, buildingCode: string) => {
    let roomCode = getRealRoomCode(room, buildingCode);
    if (room.startsWith('Waterbury'))
        roomCode = 'Waterbury';

    return room.split(roomCode)[1].trim();
}

/**
 * Returns the real room code for a given string.
 * 
 * This exists since Husky currently has some invalid
 * data for the rooms specifically in STRSWW (Storrs Hall Widmer Wing)
 * and WH (Wood Hall).
 * 
 * @param room the room string
 * @param buildingCode the building code for the room
 */
export const getRealRoomCode = (room: string, buildingCode: string) => {
    let code = buildingCode;
    if (room.startsWith('CHM'))
        code = 'CHEM';

    if (room.startsWith('STRSWW'))
        code = 'STRSWW';

    if (room.startsWith('WH'))
        code = 'WH';

    if (room.startsWith('Waterbury'))
        code = 'WTBY';

    return code;
}

/**
 * Returns a sanitized string for a provided
 * instructor string. Some strings will include
 * unrendered html entities or elements, and this
 * will convert them to whitespace to fit our needs.
 * 
 * @param instructor the provided instructor string
 */
export const getInstructorName = (instructor: string) => {
    let copy = instructor.trim();
    copy = replaceAll(copy, /<br\/*>/, ' ');
    copy = replaceAll(copy, '&nbsp;', ' ');

    return copy;
}

/**
 * Returns whether a given string is a valid course name.
 * @param input the string to test
 */
export const isValidCourseName = (name: string) => name && COURSE_IDENTIFIER.test(name);

/**
 * Attempts to retrieve an enum key from a valid enum value.
 * 
 * @param target the target enum
 * @param value the value to search by
 */
export const getEnumKeyByEnumValue = (target: any, value: string, caseSensitive = true) => {
    let keys = Object
        .keys(target)
        .filter(x => caseSensitive
            ? target[x] == value
            : target[x].toLowerCase() == value.toLowerCase());

    return keys.length > 0
        ? keys[0]
        : undefined;
}

/**
 * Infers the expected icon for a given string or element.
 * 
 * @param input the inputted icon string or element
 * @param classes [optional] the classes to add to the icon if it is a string
 */
export const inferIcon = (input: string | JSX.Element, classes = 'fa-fw') => {
    if (input instanceof String) {
        let prefix = 'fa';
        if (input.startsWith('mdi'))
            prefix = 'mdi';

        return <i className={`${prefix} ${input} ${classes}`}></i>
    }

    return input;
}

/**
 * Capitalizes the first letter of all words in a string.
 * @param input the input string
 */
export const capitalizeFirst = (input: string) => input
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');

/**
 * Flattens an array of any type into a single array.
 * @param arr the array to flatten
 */
export const flatten = (arr: any[]) => [].concat.apply([], arr);

/**
 * Sums the elements of a number array.
 * @param arr the array to sum
 */
export const sum = (arr: number[]) => arr
    .filter(ent => !isNaN(ent))
    .reduce((prev, cur) => cur + prev, 0);

/**
 * Replaces all occurances of a given
 * search string within another string.
 * 
 * @param input the input string
 * @param search the string to replace
 * @param replace what to replace it with
 */
export const replaceAll = (input: string, search: string | RegExp, replace: string) => {
    let copy = String(input);
    if (search instanceof RegExp) {
        if (!search.test(copy))
            return copy;

        while (search.test(copy))
            copy = copy.replace(search, replace);

        return copy;
    }

    if (!copy.includes(search))
        return copy;

    while (copy.includes(search))
        copy = copy.replace(search, replace);

    return copy;
}

/**
 * Retrieves the formatted duration string
 * for the given millis duration input.
 * 
 * @param time the time in milliseconds
 */
 export const getLatestTimeValue = (time: number) => {
    let sec = Math.trunc(time / 1000) % 60;
    let min = Math.trunc(time / 60000 % 60);
    let hrs = Math.trunc(time / 3600000 % 24);
    let days = Math.trunc(time / 86400000 % 30.4368);
    let mon = Math.trunc(time / 2.6297424E9 % 12.0);
    let yrs = Math.trunc(time / 3.15569088E10);

    let y = `${yrs}y`;
    let mo = `${mon}mo`;
    let d = `${days}d`;
    let h = `${hrs}h`;
    let m = `${min}m`;
    let s = `${sec}s`;

    let result = '';
    if (yrs !== 0) result += `${y}, `;
    if (mon !== 0) result += `${mo}, `;
    if (days !== 0) result += `${d}, `;
    if (hrs !== 0) result += `${h}, `;
    if (min !== 0) result += `${m}, `;
    
    result = result.substring(0, Math.max(0, result.length - 2));
    if ((yrs !== 0 || mon !== 0 || days !== 0 || min !== 0 || hrs !== 0) && sec !== 0) {
        result += ', ' + s;
    }

    if (yrs === 0 && mon === 0 && days === 0 && hrs === 0 && min === 0) {
        result += s;
    }

    return result.trim();
}

/**
 * Returns a word form of a provided
 * number. Useful for number emotes.
 * 
 * @param int the number to convert
 * @see https://gist.github.com/ForbesLindesay/5467742
 */
 export const intToWords = (int: number) => {
    let ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];

    let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
                'ninety'];
  
    let numString = int.toString();
    if (int < 0) return null;
    if (int === 0) return 'zero';
    if (int < 20) return ones[int];
  
    if (numString.length === 2)
        return tens[numString[0]] + ' ' + ones[numString[1]];
  
    if (numString.length == 3) {
        if (numString[1] === '0' && numString[2] === '0')
            return ones[numString[0]] + ' hundred';
        else
            return ones[numString[0]] + ' hundred and ' + intToWords(+(numString[1] + numString[2]));
    }
  
    if (numString.length === 4) {
        var end = +(numString[1] + numString[2] + numString[3]);
        if (end === 0) return ones[numString[0]] + ' thousand';
        if (end < 100) return ones[numString[0]] + ' thousand and ' + intToWords(end);
        return ones[numString[0]] + ' thousand ' + intToWords(end);
    }
}

/**
 * Creates a request to the target ``req`` url
 * and then generates a hook response based on the
 * ``Response`` and ``Return`` passed to the function.
 * 
 * @param req the request url
 * @param name the name of the hook for debug logging
 * @param transform how to transform the result into a Return shaped object
 * @param pollTime [optional] millis to wait before fetching new data (disabled by default)
 */
export const createRemoteHook = <Response extends UnshapedApiResponse, Return extends GenericShapedHook>(
    name: string,
    req: string,
    transform: (type: ApiResponseType, data: Response | null | undefined, error: boolean, url: string) => Return,
    pollTime?: number
): Return => {
    const start = Date.now();
    const fetcher = (url: string) => fetch(url)
        .then(res => res.json())
        .then(res => res as Response);

    const { data, error } = useSWR(req, fetcher, {
        refreshInterval: pollTime || 0
    });

    if (!data && !error)
        return transform(ApiResponseType.LOADING, null, false, req);
    
    if (error) {
        Logger.timings(`use${name}`, 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug(`use${name}`, `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        return transform(ApiResponseType.ERROR, null, true, req);
    }

    if (data && data.message) {
        Logger.timings(`use${name}`, 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug(`use${name}`, `The server responded with: ${data.message}`, Logger.LogLevelColor.ERROR);
        return transform(ApiResponseType.ERROR, null, true, req);
    }

    Logger.timings(`use${name}`, 'Fetch', start);
    Logger.debug(`use${name}`, 'Server response:', undefined, undefined, data);
    return transform(ApiResponseType.SUCCESS, data, false, req);
}

/**
 * Generates either a JSX Element or a string
 * representing the proper grading type for a course.
 * 
 * @param gradingType the grading type for the course
 */
export const matchGradingType = (gradingType: string): string | JSX.Element => {
    let lower = gradingType?.toLowerCase();
    
    if (lower === 'graded')
        return <>
            <span className="text-primary-light cursor-pointer" id="tooltip-gradingType-graded">{GradingTypeNames.GRADED}</span>
            <UncontrolledTooltip delay={0} placement="top" target="tooltip-gradingType-graded">
                Graded on A-F letter scale
                <br/>(unless otherwise noted)
            </UncontrolledTooltip>
        </>;
    
    if (lower === 'satisfactory/unsatisfactory')
        return <>
            <span className="text-primary-light cursor-pointer" id="tooltip-gradingType-SU">{GradingTypeNames.SATISFACTORY_UNSATISFACTORY}</span>
            <UncontrolledTooltip delay={0} placement="top" target="tooltip-gradingType-SU">
                Satisfactory/Unsatisfactory
            </UncontrolledTooltip>
        </>;

    if (lower === 'honors credit')
        return <>
            <span className="text-primary-light cursor-pointer" id="tooltip-gradingType-SU">{GradingTypeNames.HONORS_CREDIT}</span>
            <UncontrolledTooltip delay={0} placement="top" target="tooltip-gradingType-SU">
                Graded based on Honors Credit
            </UncontrolledTooltip>
        </>;

    if (lower === 'registered')
        return <>
            <span className="text-primary-light cursor-pointer" id="tooltip-gradingType-SU">{GradingTypeNames.REGISTERED}</span>
            <UncontrolledTooltip delay={0} placement="top" target="tooltip-gradingType-SU">
                Registration is sufficient to receive a grade
            </UncontrolledTooltip>
        </>;

    return gradingType;
}

/**
 * Returns whether or not this service is running
 * on the provided release stage.
 * 
 * @param target the release stage to check
 */
const isEnv = (target: 'development' | 'preview' | 'production') => (process.env.NEXT_PUBLIC_VERCEL_ENV || 'development') === target;

/**
 * Returns whether or not this service is running
 * in a development environment.
 */
export const isDevelopment = () => isEnv('development');

/**
 * Returns whether or not this service is running
 * in a preview (staging) environment.
 */
export const isPreview = () => isEnv('preview');

/**
 * Returns whether or not this service is running
 * in production.
 */
export const isProd = () => isEnv('production');