import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import {
    ProfileCard,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { Currency } from 'entities/Curency';
import { Country } from 'entities/Country';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../../model/service/fetchProfileDate/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {
    EditableProfileCardHeader,
} from '../EditableProfileCardHeader/EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string
    id: string;
}

const reducers: ReducerList = {
    profile: profileReducer,
};

export const EditableProfileCard = ({ className, id }: EditableProfileCardProps) => {
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstname: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );
    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: value || '' }));
        },
        [dispatch],
    );
    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }));
        },
        [dispatch],
    );
    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );
    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="8">
                <EditableProfileCardHeader />
                <ProfileCard
                    className={className}
                    data={formData}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    readonly={readonly}
                    onChangeLastname={onChangeLastname}
                    onChangeFirstname={onChangeFirstname}
                    isLoading={isLoading}
                    error={error}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>

        </DynamicModuleLoader>

    );
};
