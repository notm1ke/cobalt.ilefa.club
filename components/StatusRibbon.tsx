import React from 'react';
import MdiIcon from '@mdi/react';

import styles from './styling/ribbon.module.css';

import { Ribbon } from '.';
import { useStatus } from '../hooks';
import { UConnServiceStatus } from '@ilefa/husky';
import { mdiAlert, mdiReloadAlert } from '@mdi/js';
import { Color, CustomUConnServiceString } from '../util';

type RibbonGenerator = {
    level: UConnServiceStatus;
    names: string[];
    dismissible?: boolean;
    className?: string;
}

type RibbonOpts = {
    level: UConnServiceStatus;
    color: Color;
    icon?: string | JSX.Element;
    message: (names: string[]) => JSX.Element;
}

interface RibbonLinkProps {
    href: string;
    display: string | JSX.Element;
    className?: string;
    newTab?: boolean;
}

const RibbonLink: React.FC<RibbonLinkProps> = ({ href, display, className, newTab }) =>
    <a
        href={href}
        className={className || 'text-white font-weight-600 shine'}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}>
            {display}
    </a>

const RibbonMessages: RibbonOpts[] = [
    {
        level: UConnServiceStatus.DEGRADED,
        color: 'primary',
        icon: <MdiIcon path={mdiReloadAlert} size={'25px'} className={styles.mdiIcon} />,
        message: (names: string[]) =>
            <>
                <b>Cobalt's</b> performance may be degraded due to service issues affecting the {concatNames(names)}{" "}
                — see more on the <RibbonLink display="IT Status" href="https://itstatus.uconn.edu" newTab /> page.
            </>
    },
    {
        level: UConnServiceStatus.OUTAGE,
        color: 'danger',
        icon: <MdiIcon path={mdiAlert} size={'25px'} className={styles.mdiIcon} />,
        message: (names: string[]) =>
            <>
                <b>Cobalt's</b> functionality has been impacted due to outages affecting the {concatNames(names)}{" "}
                — see more on the <RibbonLink display="IT Status" href="https://itstatus.uconn.edu" newTab /> page.
            </>
    }
]

export interface StatusRibbonProps {
    track: CustomUConnServiceString[];
    ignore?: UConnServiceStatus[];
    dismissible?: boolean;
    className?: string;
}

export const StatusRibbon: React.FC<StatusRibbonProps> = ({ track, ignore, dismissible, className }) => {
    const [status, loading, error] = useStatus(false, ...track);
    if (loading || error)
        return <></>;

    // all services operational
    let filtered = status!.filter(srv => ignore ? !ignore.includes(srv.status) : true);
    if (filtered.every(srv => srv.status === UConnServiceStatus.OPERATIONAL))
        return <></>;

    let level = UConnServiceStatus.OUTAGE;
    let nonOperational = status!.filter(srv => srv.status !== UConnServiceStatus.OPERATIONAL);

    // no outages, only degraded
    if (!nonOperational.some(srv => srv.status === UConnServiceStatus.OUTAGE)
        && nonOperational.some(srv => srv.status === UConnServiceStatus.DEGRADED))
            level = UConnServiceStatus.DEGRADED;
    
    let names = nonOperational
        .filter(srv => srv.status === level)
        .map(srv => srv.display.toLowerCase())
        .sort((a, b) => a.localeCompare(b));

    return generateRibbon({ level, names, dismissible, className });
}

const concatNames = (names: string[]) =>
    <span>
        {
            names.length === 1
                ? <b>{names[0]}</b>
                : <><b>{names.slice(0, names.length - 1).join(', ')}</b> and <b>{names.slice(names.length - 1)}</b></>
        }
    </span>

const generateRibbon = ({ level, names, dismissible, className }: RibbonGenerator) => {
    let generator = RibbonMessages.find(msg => msg.level === level);
    if (!generator) return <></>;

    return (
        <Ribbon
            color={generator.color}
            icon={generator.icon}
            dismissible={dismissible}
            className={className || 'mt-5 mb--7 ml-md-5 mr-md-5'}>
                { generator.message(names) }
        </Ribbon>
    )
}