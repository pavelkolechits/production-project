import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Icon } from 'shared/ui/deprecated/Icon/Icon';
import { Popover } from 'shared/ui/deprecated/Popups';
import { NotificationList } from 'entities/Natifications';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown';
import { Drawer } from 'shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeature, toggleFeature } from 'shared/features';
import { Button } from 'shared/ui/redesigned/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeature({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });
    if (authData) {
        return (
            <ToggleFeature
                name="isAppRedesigned"
                on={(
                    <header
                        className={classNames(mainClass, {}, [
                            className,
                        ])}
                    >
                        {' '}
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                )}
                off={(
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                )}
            />
        );
    }
    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeature
                name="isAppRedesigned"
                on={(
                    <Button variant="clear" onClick={onShowModal}>
                        {t('Войти')}
                    </Button>
                )}
                off={(
                    <ButtonDeprecated theme={ThemeButton.BACKGROUND_INVERTED} onClick={onShowModal}>
                        {t('Войти')}
                    </ButtonDeprecated>
                )}
            />

            {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />}
        </header>
    );
});
