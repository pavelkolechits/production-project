import React, { memo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '../../../assets/icons/logo.svg';
import { HStack } from '../../deprecated/Stack/HStack/HStack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg color="black" width={size} height={size} className={cls.appLogo} />
        </HStack>
    );
});
