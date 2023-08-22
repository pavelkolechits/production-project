import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Flex.module.scss';

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexAlign = 'start' | 'center' | 'end';
type FlexGap = '4' | '8' | '16' | '32'
type FlexWrap = 'wrap' | 'nowrap'
export type FlexDirection = 'row' | 'column';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
    around: cls.justifyAround,
};
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};
const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string,
    children: ReactNode,
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
    wrap?: FlexWrap;
}

export const Flex = (props : FlexProps) => {
    const {
        children,
        className,
        justify = 'center',
        align = 'center',
        direction = 'row',
        wrap = 'nowrap',
        gap,
        max,
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        cls[wrap],
    ];
    return (
        <div className={classNames(cls.Flex, { [cls.max]: max }, classes)}>
            {children}
        </div>
    );
};
