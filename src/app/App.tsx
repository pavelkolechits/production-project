import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { ToggleFeature } from 'shared/features/ToggleFeature';
import { Loader } from 'shared/ui/deprecated/Loader/Loader';
import { AppLoaderLayout } from 'shared/layouts/AppLoaderLayout';
import { ScrollToTopButton } from 'features/ScrollToTopButton';
import { MainLayout } from 'shared/layouts';
import { ScrollToolbar } from 'widgets/ScrollToolbar';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from '../shared/lib/helpers/classNames/classNames';
import { AppRouter } from './providers/router';
import { useAppToolbar } from './lib/useAppToolbar';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);
    if (!inited) {
        <ToggleFeature off={<Loader />} on={<AppLoaderLayout />} name="isAppRedesigned" />;
    }
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
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            )}
        />
    );
};
