import React, { memo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '../../../assets/icons/logo.svg';
import { HStack } from '../../deprecated/Stack/HStack/HStack';

interface AppLogoProps {
    className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg className={cls.appLogo} />
        </HStack>
    );
});
