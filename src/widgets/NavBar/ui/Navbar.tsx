import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Dropdown
                    direction="bottom left"
                    className={cls.dropdown}
                    items={[
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        },
                        {
                            content: t('Профиль пользователя'),
                            href: RoutePath.profile + authData.id,
                        },
                    ]}
                    trigger={<Avatar alt="/" size={30} src={authData.avatar} />}
                />
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
