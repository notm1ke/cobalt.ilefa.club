import { getEnumKeyByEnumValue } from '.';

export enum LogLevel {
    INFO = 'Info',
    WARN = 'Warning',
    ERROR = 'Error'
}

export enum LogLevelColor {
    INFO = '#66a7c5',
    WARN = '#ffa726',
    ERROR = '#d32f2f'
}

export const log = (level: LogLevel, module: string, text: string, ...opts: string[]) => {
    let color = LogLevelColor[getEnumKeyByEnumValue(LogLevel, level) as string];
    console.log(`%c ${module.toUpperCase()} %c ${text}`, `background: ${color}; color: #fff;`, 'color: inherit;', opts);
}

export const raw = (message: string, ...opts: string[]) => console.log(message, opts);