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
import styles from '../../styling/inspection.module.css';

export interface ErrorTabProps {
    message?: string;
    color?: string;
    icon?: string;
}

export const ErrorTab: React.FC<ErrorTabProps> = ({ message, color, icon }) => (
    <div className={`${styles.sectionDataExpanded} ${styles.loader} ${color || 'text-danger'}`}>
        <i className={`${icon || 'fa fa-times-circle'} fa-fw mr-2`}></i>{message || 'Something went wrong while processing your request.'}
    </div>
)