/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { Popover, PopoverBody, PopoverHeader, PopoverHeaderProps, PopoverProps } from 'reactstrap';

export type HoverablePopoverProps = PopoverProps & {
    active: boolean;
    setActive: (val: boolean) => void;
    header?: React.ReactNode;
    headerProps?: PopoverHeaderProps;
    children: React.ReactNode;
}

export const HoverablePopover: React.FC<HoverablePopoverProps> = (props) => {
    return (
        <Popover
            {...props}
            isOpen={props.active}
            toggle={() => props.setActive(!props.active)}
        >
            {
                props.header && (
                    <PopoverHeader {...props.headerProps}>
                        {props.header}
                    </PopoverHeader>
                )
            }
            <PopoverBody>
                {props.children}
            </PopoverBody>
        </Popover>
    )
}