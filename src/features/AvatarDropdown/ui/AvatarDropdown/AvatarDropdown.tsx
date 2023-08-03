import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useCallback } from 'react';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Dropdown as DropdownDeprecated } from 'shared/ui/deprecated/Popups';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/Avatar';
import { getRouteAdmin, getRouteProfile } from 'shared/consts/router';
import { ToggleFeature } from 'shared/features';
import { Avatar } from 'shared/ui/redesigned/Avatar/Avatar';
import { Dropdown } from 'shared/ui/redesigned/Popups';

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

    const items = (
        [
            ...(isAdminPanelAvailable ? [{
                content: t('Админка'),
                href: getRouteAdmin(),
            }] : []),
            {
                content: t('Выйти'),
                onClick: onLogout,
            },
            {
                content: t('Профиль пользователя'),
                href: getRouteProfile(authData.id),
            },
        ]
    );
    return (
        <ToggleFeature
            on={(
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={<Avatar alt="/" size={40} src={authData.avatar} />}
                />
            )}
            off={(
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={<AvatarDeprecated alt="/" size={30} src={authData.avatar} />}
                />
            )}
            name="isAppRedesigned"
        />

    );
};
