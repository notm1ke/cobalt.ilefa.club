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