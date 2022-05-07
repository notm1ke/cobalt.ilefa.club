/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';

import { Color, inferIcon } from '../../util';
import { UncontrolledAlert } from 'reactstrap';

export interface RibbonProps {
    color: Color;
    icon?: string | JSX.Element;
    dismissible?: boolean;
    className?: string;
}

export const Ribbon: React.FC<RibbonProps> = ({ color, icon, dismissible, className, children }) => (
    <UncontrolledAlert color={color} className={className ?? ''} closeClassName={!dismissible ? 'd-none' : ''}>
        <span className="alert-inner--icon">
            { icon ? inferIcon(icon || '') : <i className="fa fa-exclamation-circle"></i> }
        </span>{" "}
        <span className="alert-inner--text">
            { children }
        </span>
    </UncontrolledAlert>
)