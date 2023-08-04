import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/helpers/classNames/classNames';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/Input';
import { Loader } from 'shared/ui/deprecated/Loader/Loader';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Curency';
import { Country, CountrySelect } from 'entities/Country';
import { ToggleFeature } from 'shared/features';
import { Input } from 'shared/ui/redesigned/Input/Input';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { Avatar } from 'shared/ui/redesigned/Avatar/Avatar';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';
import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCountry?: (value: Country) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (value: Currency) => void;
  readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { isLoading, error } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <ToggleFeature
                name="isAppRedesigned"
                on={<ProfileCardRedesignedSkeleton />}
                off={<ProfileCardDeprecatedLoader />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeature
                name="isAppRedesigned"
                on={<ProfileCardRedesignedError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={<ProfileCardRedesigned {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};
