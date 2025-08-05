import './icon-button.scss';
import { type FC, type PropsWithChildren } from 'react';
interface IProps extends PropsWithChildren {
    onClick: () => void;
}
export declare const IconButton: FC<IProps>;
export {};
