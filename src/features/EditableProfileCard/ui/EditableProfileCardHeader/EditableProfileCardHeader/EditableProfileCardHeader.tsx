import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { ToggleFeature } from 'shared/features';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Text } from 'shared/ui/redesigned/Text';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { profileActions } from '../../../model/slice/profileSlice';
import { updateProfileData } from '../../../model/service/updateProfileDate/updateProfileData';
import { getProfileData } from '../../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

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
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <Card max className={cls.ProfilePageHeader}>
                    <HStack justify="between">
                        <Text title={t('Профиль')} />
                        {canEdit
            && (
                <div className={cls.btnsWrap}>
                    {readonly ? (
                        <Button
                            onClick={onEdit}
                            className={cls.editBtn}
                            variant="outline"
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                onClick={onCanselEdit}
                                className={cls.editBtn}
                                variant="outline-error"
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={onSave}
                                className={cls.editBtn}
                                variant="outline-success"
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
                    </HStack>

                </Card>
            )}
            off={(
                <div className={cls.ProfilePageHeader}>
                    <p>{t('Профиль')}</p>
                    {canEdit
            && (
                <div className={cls.btnsWrap}>
                    {readonly ? (
                        <ButtonDeprecated
                            onClick={onEdit}
                            className={cls.editBtn}
                            theme={ThemeButton.OUTLINE}
                        >
                            {t('Редактировать')}
                        </ButtonDeprecated>
                    ) : (
                        <>
                            <ButtonDeprecated
                                onClick={onCanselEdit}
                                className={cls.editBtn}
                                theme={ThemeButton.OTLINE_ERROR}
                            >
                                {t('Отменить')}
                            </ButtonDeprecated>
                            <ButtonDeprecated
                                onClick={onSave}
                                className={cls.editBtn}
                                theme={ThemeButton.OUTLINE_SUCCESS}
                            >
                                {t('Сохранить')}
                            </ButtonDeprecated>
                        </>
                    )}
                </div>
            )}
                </div>
            )}
        />

    );
};
