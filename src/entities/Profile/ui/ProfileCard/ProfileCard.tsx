import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from 'entities/Curency/model/types/currency';
import { CurrencySelect } from 'entities/Curency';
import { Country, CountrySelect } from 'entities/Country';
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
    const { t } = useTranslation();

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
                    placeholder={t('Ваше фамилия')}
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
                    placeholder={t('Ваш город')}
                    value={data?.city}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeCurrency}
                    value={data?.currency}
                />
                <CountrySelect
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeCountry}
                    value={data?.country}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ссылка на аватар')}
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
