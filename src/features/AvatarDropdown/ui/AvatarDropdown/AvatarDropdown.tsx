import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useCallback } from 'react';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Dropdown } from 'shared/ui/deprecated/Popups';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useAppDispatch();
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    const isAdminPanelAvailable = isAdmin || isManager;
    if (!authData) {
        return null;
    }
    return (

        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottom left"
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('Админка'),
                    href: RoutePath.admin_panel,
                }] : []),
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

    );
};
