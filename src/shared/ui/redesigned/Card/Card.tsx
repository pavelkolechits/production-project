import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = '0' | '8' | '16' | '24' | '40';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: 'gap_0',
    8: 'gap_8',
    16: 'gap_16',
    24: 'gap_24',
};
const mapBorderToClass: Record<CardBorder, string> = {
    0: 'border_0',
    8: 'border_8',
    16: 'border_16',
    24: 'border_24',
    40: 'border_40',
};

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        border = '8',
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];
    const borderClass = mapBorderToClass[border];

    return (
        <div
            className={classNames(cls.Card, { [cls.max]: max }, [
                className,
                cls[variant],
                cls[paddingClass],
                cls[borderClass],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
