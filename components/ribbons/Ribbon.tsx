/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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