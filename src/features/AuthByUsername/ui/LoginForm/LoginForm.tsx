import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Input } from 'shared/ui/redesigned/Input/Input';
import { ToggleFeature } from 'shared/features';
import { Text } from 'shared/ui/redesigned/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [username, password, dispatch, onSuccess]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeature
                name="isAppRedesigned"
                on={(
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        {error && <Text variant="error" text={error} />}
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
                        <Button
                            disabled={isLoading}
                            onClick={onLoginClick}
                            variant="outline"
                            className={cls.loginBtn}
                        >
                            {t('Войти')}
                        </Button>
                    </div>
                )}
                off={(
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        {error && <div>{error}</div>}
                        <InputDeprecated
                            autofocus
                            placeholder={t('Введите имя пользователя')}
                            className={cls.input}
                            type="text"
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <InputDeprecated
                            placeholder={t('Введите пароль')}
                            className={cls.input}
                            type="text"
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            disabled={isLoading}
                            onClick={onLoginClick}
                            theme={ThemeButton.OUTLINE}
                            className={cls.loginBtn}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </div>
                )}
            />

        </DynamicModuleLoader>

    );
});
export default LoginForm;
