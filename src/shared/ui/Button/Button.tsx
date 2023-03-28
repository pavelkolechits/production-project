import { classNames } from 'shared/lib/helpers/classNames/classNames';
import {
    ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}
export enum SizeButton {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
  }

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: SizeButton;
  disabled?: boolean;
  children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className, theme, children, square, size, disabled, ...otherProps
    } = props;
    return (
        <button
            type="button"
            {...otherProps}
            disabled={disabled}
            className={
                classNames(
                    cls.Button,
                    { [cls.square]: square, [cls.disabled]: disabled },
                    [className, cls[theme], cls[size]],
                )
            }
        >
            {children}
        </button>
    );
});
