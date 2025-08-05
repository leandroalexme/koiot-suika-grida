import './popover.scss';
import { type OffsetOptions, type Placement } from '@floating-ui/react';
import React, { type FC } from 'react';
interface PopoverProps {
    content: React.ReactNode;
    children: React.ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: Placement;
    trigger?: 'click' | 'hover';
    offset?: OffsetOptions;
}
export declare const Popover: FC<PopoverProps>;
export {};
