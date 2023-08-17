import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/Input';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeature } from 'shared/features';
import { Input } from 'shared/ui/redesigned/Input/Input';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { getAddNewCommentError, getAddNewCommentText } from '../model/selectors/addNewCommentSelectors';
import cls from './AddNewComment.module.scss';
import { addNewCommentAction, addNewCommentReducer } from '../model/slice/addNewCommentSlice';

interface AddNewCommentProps {
    className?: string;
    onSendComment: (text: string) => void
}
const reducers: ReducerList = {
    addNewComment: addNewCommentReducer,
};

const AddNewComment = (props: AddNewCommentProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddNewCommentText);
    const error = useSelector(getAddNewCommentError);
    const onChangeValue = useCallback((value: string) => {
        dispatch(addNewCommentAction.setText(value));
    }, [dispatch]);
    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onChangeValue('');
    }, [onChangeValue, onSendComment, text]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <ToggleFeature
                name="isAppRedesigned"
                on={(
                    <Card border="16">
                        <HStack gap="16" justify="between" max>
                            <Input
                                className={cls.input}
                                onChange={onChangeValue}
                                value={text}
                                placeholder={t('Текст комментария')}
                            />
                            <Button onClick={onSendHandler} variant="outline">{t('Отправить')}</Button>
                        </HStack>
                    </Card>

                )}
                off={(
                    <div className={classNames(cls.AddNewComment, {}, [className])}>
                        <InputDeprecated
                            className={cls.input}
                            onChange={onChangeValue}
                            value={text}
                            placeholder={t('Текст комментария')}
                        />
                        <ButtonDeprecated
                            onClick={onSendHandler}
                            theme={ThemeButton.OUTLINE}
                        >
                            {t('Отправить')}

                        </ButtonDeprecated>
                    </div>
                )}
            />

        </DynamicModuleLoader>

    );
};
export default memo(AddNewComment);
