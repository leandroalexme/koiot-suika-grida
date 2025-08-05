import './button.scss';
import { type FC, type PropsWithChildren } from 'react';
interface IProps extends PropsWithChildren {
    style?: React.CSSProperties;
    onClick: () => void;
}
export declare const Button: FC<IProps>;
export {};
