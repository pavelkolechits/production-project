
import { classNames } from "shared/lib/helpers/classNames/classNames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    className,
    to,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;
  return (
    <Link
      {...otherProps}
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
    >
        {children}
    </Link>
  );
};
