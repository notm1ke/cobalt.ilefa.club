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