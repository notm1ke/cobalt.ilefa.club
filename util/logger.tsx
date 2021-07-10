import { getEnumKeyByEnumValue, isDevelopment } from '.';

export enum LogLevel {
    INFO = 'Info',
    WARN = 'Warning',
    ERROR = 'Error',
}

export enum LogLevelColor {
    INFO = '#66a7c5',
    WARN = '#ffa726',
    ERROR = '#d32f2f',
    TIMINGS = '#6dc466',
}

export const log = (level: LogLevel, module: string | null, text: string, ...opts: string[]) => {
    let header = module ?? level;
    let color = LogLevelColor[getEnumKeyByEnumValue(LogLevel, level) as string];
    console.log(`%c ${header.toUpperCase()} %c ${text}`, `background: ${color}; color: #fff;`, 'color: inherit;', opts);
}

export const timings = (module: string, task: string, start: number, color?: LogLevelColor, what = 'took', cond?: boolean, end: number = Date.now()) => {
    if (!isDevelopment())
        return;

    // this might look like gibberish, but it checks if the cond is set, and then if its false
    if (cond && !cond)
        return;

    let diff = (end - start).toFixed(2);
    console.log(`%c DEV %c [${module}] ${task} ${what} ${diff}ms.`, `background: ${color || LogLevelColor.TIMINGS}; color: #fff;`, 'color: inherit;');
}

export const debug = (module: string, text: string, color?: LogLevelColor, cond?: boolean, data?: any | any[]) => {
    if (!isDevelopment())
        return;

    // this might look like gibberish, but it checks if the cond is set, and then if its false
    if (cond && !cond)
        return; 

    if (data)
        return console.log(`%c DEV %c [${module}] ${text}`, `background: ${color || LogLevelColor.TIMINGS}; color: #fff;`, 'color: inherit;', data);

    console.log(`%c DEV %c [${module}] ${text}`, `background: ${color || LogLevelColor.TIMINGS}; color: #fff;`, 'color: inherit;');
}

export const raw = (message: string, ...opts: string[]) => console.log(message, opts);

export const clear = () => console.clear();