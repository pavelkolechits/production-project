import { userReducer, userActions } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/user';
import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited';

export {
    userActions, userReducer, User, UserSchema, getUserAuthData, getUserInited,
};

export { UserRole } from './model/types/user';
export { isUserAdmin, isUserManager, getUserRole } from './model/selectors/roleSelectors';
