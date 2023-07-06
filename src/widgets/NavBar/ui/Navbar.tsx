import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Natifications';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown';
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
    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
                <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />
            </div>
        );
    }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={ThemeButton.BACKGROUND_INVERTED} onClick={onShowModal}>
                {t('Войти')}
            </Button>
            {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />}
        </div>
    );
});
