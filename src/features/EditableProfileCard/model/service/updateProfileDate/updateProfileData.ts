import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
    >(
        'profile/updateProfileData',
        async (profileId, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            const formData = getProfileForm(getState());
            try {
                const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
