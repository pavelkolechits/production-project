import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { ToggleFeature } from 'shared/features/ToggleFeature';
import { MainLayout } from 'shared/layouts';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from '../shared/lib/helpers/classNames/classNames';
import { AppRouter } from './providers/router';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <ToggleFeature
            name="isAppRedesigned"
            off={(
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            {inited && <AppRouter />}
                        </div>
                    </Suspense>
                </div>
            )}
            on={(
                <div id="app" className={classNames('app_redesigned', {}, [theme])}>

                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            sidebar={<Sidebar />}
                            content={<AppRouter />}
                        />
                    </Suspense>
                </div>
            )}
        />
    );
};
