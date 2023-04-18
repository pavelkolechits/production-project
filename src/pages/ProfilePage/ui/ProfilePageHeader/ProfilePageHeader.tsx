import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCanselEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={cls.ProfilePageHeader}>
            <p>{t('Профиль')}</p>
            {readonly ? (
                <Button onClick={onEdit} className={cls.editBtn} theme={ThemeButton.OUTLINE}>
                    {t('редактировать')}
                </Button>
            ) : (
                <>
                    <Button onClick={onCanselEdit} className={cls.editBtn} theme={ThemeButton.OUTLINE}>
                        {t('отменить')}
                    </Button>
                    <Button onClick={onSave} className={cls.editBtn} theme={ThemeButton.OUTLINE}>
                        {t('сохранить')}
                    </Button>
                </>
            )}
        </div>
    );
};
