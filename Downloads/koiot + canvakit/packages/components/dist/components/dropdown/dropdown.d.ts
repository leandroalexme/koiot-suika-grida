import './dropdown.scss';
import { type OffsetOptions, type Placement } from '@floating-ui/react';
import React, { type FC } from 'react';
import { type Item } from './type';
export interface IDropdownProps {
    items: Item[];
    onClick?: (params: {
        key: string;
    }) => boolean | void;
    children: React.ReactNode;
    placement?: Placement;
    trigger?: 'click' | 'hover';
    offset?: OffsetOptions;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const Dropdown: FC<IDropdownProps>;
