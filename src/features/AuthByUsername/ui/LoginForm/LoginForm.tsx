import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
        console.log('123');
    }, [username, password, dispatch]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {error && <div>{error}</div>}
            <Input
                autofocus
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                type="text"
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                placeholder={t('Введите пароль')}
                className={cls.input}
                type="text"
                onChange={onChangePassword}
                value={password}
            />
            <Button disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.OUTLINE} className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
});
