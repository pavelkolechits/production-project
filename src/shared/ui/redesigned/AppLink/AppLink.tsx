import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, ReactNode } from 'react';
import { Link, LinkProps, NavLink } from 'react-router-dom';
import cls from './AppLink.module.scss';

type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        className,
        to,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props;
    return (
        <NavLink
            {...otherProps}
            to={to}
            className={
                ({ isActive }) => classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])
            }
        >
            {children}
        </NavLink>
    );
});
