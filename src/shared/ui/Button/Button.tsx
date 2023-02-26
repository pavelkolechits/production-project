import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
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
  size?: SizeButton
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className, theme, children, square, size, ...otherProps
    } = props;
    return (
        <button
            type="button"
            {...otherProps}
            className={
                classNames(
                    cls.Button,
                    { [cls.square]: square },
                    [className, cls[theme], cls[size]],
                )
            }
        >
            {children}
        </button>
    );
};
