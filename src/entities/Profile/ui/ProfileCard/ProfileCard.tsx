import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/helpers/classNames/classNames';
import { Input } from 'shared/ui/deprecated/Input/Input';
import { Loader } from 'shared/ui/deprecated/Loader/Loader';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Curency';
import { Country, CountrySelect } from 'entities/Country';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
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
    const {
        className,
        data,
        error,
        isLoading,
        onChangeFirstname,
        onChangeLastname,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
        readonly,
        onChangeAge,
        onChangeCity,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <div
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <p>{t('error')}</p>
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar
                && (
                    <div className={cls.avatarWrap}>
                        <Avatar src={data.avatar} alt="/" />
                    </div>
                )}
                <Input
                    onChange={onChangeFirstname}
                    className={cls.input}
                    placeholder={t('Ваше имя')}
                    value={data?.firstname}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваша фамилия')}
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваш возраст')}
                    value={data?.age}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Город')}
                    value={data?.city}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.currency}
                    readonly={readonly}
                    onChange={onChangeCurrency}
                    value={t(data?.currency as string)}
                />
                <CountrySelect
                    className={cls.country}
                    readonly={readonly}
                    onChange={onChangeCountry}
                    value={t(data?.country as string)}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Введите ссылку на аватар')}
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
