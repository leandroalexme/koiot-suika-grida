import './dropdown-item.scss';
import { type EventEmitter } from '@suika/common';
import { type FC } from 'react';
import { type DropdownEvents, type Item } from '../type';
interface IProps {
    itemKey: string;
    label: string;
    suffix?: string;
    check?: boolean;
    subItems?: Item[];
    onClick: (params: {
        key: string;
    }) => void;
    emitter: EventEmitter<DropdownEvents>;
}
export declare const DropdownItem: FC<IProps>;
export {};
