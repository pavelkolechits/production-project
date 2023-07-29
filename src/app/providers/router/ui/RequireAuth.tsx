import { useSelector } from 'react-redux';
import { UserRole, getUserAuthData, getUserRole } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouteForbidden, getRouteMain } from 'shared/consts/router';

interface RequireAuthProps {
    // eslint-disable-next-line no-undef
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRole);

    const hasRequireRole = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requireRole) => {
            const hasRole = userRoles?.includes(requireRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }
    if (!hasRequireRole) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}
