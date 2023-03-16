import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from '../shared/lib/helpers/classNames/classNames';
import { AppRouter } from './providers/router';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
