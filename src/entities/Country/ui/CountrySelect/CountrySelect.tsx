import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CurrencySelectProps {
    className?: string
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean
}
const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = ({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            direction="top right"
            items={options}
            defaultValue={t('Укажите валюту')}
            className={classNames('', {}, [className])}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
};
