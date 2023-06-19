import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { UserRole } from '../consts/consts';

export const getUserRole = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRole, (roles) => {
    return Boolean(roles?.includes(UserRole.ADMIN));
});
export const isUserManager = createSelector(getUserRole, (roles) => Boolean(roles?.includes(UserRole.MANAGER)));
export const isUserUser = createSelector(getUserRole, (roles) => Boolean(roles?.includes(UserRole.USER)));
