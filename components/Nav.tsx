import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styling/nav.module.css';

import { useState } from 'react';
import { isDevelopment } from '../util';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Navbar,
    UncontrolledCollapse,
    UncontrolledDropdown
} from 'reactstrap';

type DropdownMode = 'icons' | 'normal';

type NavDropdown = {
    name: string;
    href: string;
    icon?: JSX.Element;
    color?: string;
    content?: string;
}

type NavElement = {
    name: string;
    icon: string;
    href: string;
    key: string;
    devOnly?: boolean;
    dropdown?: {
        mode: DropdownMode;
        items: NavDropdown[];
    };
}

const ELEMENTS: NavElement[] = [
    {
        name: 'home',
        icon: 'fa fa-home',
        href: '/',
        key: 'home',
    },
    {
        name: 'buildings',
        icon: 'fa fa-city',
        href: '/buildings',
        key: 'buildings',
    },
    {
        name: 'snapshots',
        icon: 'fa fa-history',
        href: '/snapshots',
        key: 'snapshots',
        devOnly: true,
    },
    {
        name: 'internal',
        icon: 'fa fa-bug',
        href: '/internal',
        key: 'internal',
        devOnly: true,
        // dropdown: {
        //     mode: 'icons',
        //     items: [
        //         {
        //             name: 'service information',
        //             href: '/internal',
        //             icon: <i className="fa fa-terminal fa-fw"></i>,
        //             color: 'bg-primary',
        //             content: 'Inspect information about this instance.',
        //         },
        //         {
        //             name: 'upstream status',
        //             href: '/internal',
        //             icon: <i className="fa fa-cloud fa-fw"></i>,
        //             color: 'bg-primary',
        //             content: 'Inspect upstream provider statuses.',
        //         },
        //         {
        //             name: 'platform tests',
        //             href: '/transfer',
        //             icon: <i className="fa fa-vial fa-fw"></i>,
        //             color: 'bg-primary',
        //             content: 'Inspect various functionality of Cobalt.',
        //         }
        //     ]
        // }
    },
    {
        name: 'information',
        icon: 'fa fa-info-circle',
        href: '/info',
        key: 'information',
    }
];

export const Nav = () => {
    const [classes, setClasses] = useState('');
    const onExiting = () => setClasses('collapsing-out');
    const onExited = () => setClasses('');

    return (
        <header className="header-global">
            <Navbar className="navbar-main navbar-transparent navbar-light" expand="lg">
                <div className="container">
                    <Link href="/">
                        <a className={`mr-lg-1 navbar-brand ${styles.navBrandText}`}>
                            <Image
                                src="/logo.png"
                                alt="Cobalt"
                                width={400}
                                height={300}
                                className={`img img-fluid ${styles.navBrandImg}`}
                            />
                        </a>
                    </Link>
                    <button className="navbar-toggler" id="navbar_global">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse
                        toggler="#navbar_global"
                        navbar
                        className={classes}
                        onExiting={onExiting}
                        onExited={onExited}
                    >
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <Link href="/">
                                        <a className={`navbar-collapse-title text-primary ${styles.navBrandMobileText}`}>
                                            Cobalt
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button className={`navbar-toggler ${styles.navBrandMobileCloser}`} id="navbar_global">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                            {
                                ELEMENTS.map(element => {
                                    if (element.devOnly && !isDevelopment())
                                        return;

                                    if (element.dropdown && element.dropdown.mode === 'icons') {
                                        return <UncontrolledDropdown nav>
                                            <DropdownToggle nav className={styles.navLink}>
                                                <i className={`${element.icon} fa-fw`}></i>
                                                <span className="nav-link-inner--text">{element.name}</span>
                                            </DropdownToggle>
                                            <DropdownMenu className={`dropdown-menu ${styles.dropdownPosition}`}>
                                                <div className="dropdown-menu-inner">
                                                    {
                                                        element.dropdown.items.map(item => (
                                                            <Media className="d-flex align-items-center" href={item.href}>
                                                                <div className={`icon icon-shape ${item.color ?? 'bg-primary'} rounded-circle text-white`}>
                                                                    {item.icon}
                                                                </div>
                                                                <Media body className="ml-3">
                                                                    <h6 className="heading text-primary mb-md-1 text-lowercase font-weight-600">{item.name}</h6>
                                                                    { item.content && <p className="description d-none d-md-inline-block mb-0">{item.content}</p> }
                                                                </Media>
                                                            </Media>
                                                        ))
                                                    }
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    }

                                    if (element.dropdown && element.dropdown.mode === 'normal')
                                        return <UncontrolledDropdown nav>
                                            <DropdownToggle nav caret className={styles.navLink}>
                                                <span className="nav-link-inner--text">{element.name}</span>
                                            </DropdownToggle>
                                            <DropdownMenu className={`dropdown-menu ${styles.normalDropdownPosition}`}>
                                                {
                                                    element.dropdown.items.map(item =>
                                                        <DropdownItem href={item.href || '#'}>
                                                            {item.name}
                                                        </DropdownItem>
                                                    )
                                                }
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    return <li className="nav-item" key={element.key}>
                                        <Link href={element.href}>
                                            <a className={`nav-link ${styles.navLink}`}>
                                                <i className={`${element.icon} fa-fw`}></i> {element.name ?? ''}
                                            </a>
                                        </Link>
                                    </li>;
                                })
                            }
                        </ul>
                    </UncontrolledCollapse>
                </div>
            </Navbar>
        </header>
    );
}