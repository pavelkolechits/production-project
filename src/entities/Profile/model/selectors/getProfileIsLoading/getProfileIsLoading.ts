import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileSchema } from '../../types/profile';

export const getProfileIsLoading = (state: StateSchema) => state?.profile?.isLoading || false;
