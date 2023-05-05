import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
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
            <div className={classNames(cls.AddNewComment, {}, [className])}>
                <Input
                    className={cls.input}
                    onChange={onChangeValue}
                    value={text}
                    placeholder={t('Текст комментария')}
                />
                <Button onClick={onSendHandler} theme={ThemeButton.OUTLINE}>{t('Отправить')}</Button>
            </div>
        </DynamicModuleLoader>

    );
};
export default memo(AddNewComment);
