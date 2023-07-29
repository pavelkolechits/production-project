import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Popover as PopoverDeprecated } from 'shared/ui/deprecated/Popups';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/Icon';
import { NotificationList } from 'entities/Natifications';
import { Drawer } from 'shared/ui/deprecated/Drawer/Drawer';
import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from 'shared/lib/helpers/components/AnimationProvider';
import { ToggleFeature } from 'shared/features';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import { Popover } from 'shared/ui/redesigned/Popups';
import cls from './NotificationButton.module.scss';
import NotificationIcon from '../../../../shared/assets/icons/notification.svg';

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeature
            on={(
                <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
            )}
            off={(
                <ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
                    <IconDeprecated Svg={NotificationIcon} inverted />
                </ButtonDeprecated>
            )}
            name="isAppRedesigned"
        />

    );

    return (
        <div>
            <BrowserView>
                <ToggleFeature
                    name="isAppRedesigned"
                    on={(
                        <Popover
                            className={classNames(cls.NotificationButton, {}, [className])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    )}
                    off={(
                        <PopoverDeprecated
                            className={classNames(cls.NotificationButton, {}, [className])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    )}
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>

    );
};
