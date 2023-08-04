import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from 'shared/ui/deprecated/Popups';
import { ToggleFeature } from 'shared/features';
import { ListBox } from 'shared/ui/redesigned/Popups';
import { Country } from '../../model/consts/consts';

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

    const props = {
        direction: 'top left' as const,
        items: options,
        defaultValue: t('Укажите валюту'),
        className: classNames('', {}, [className]),
        value,
        onChange: onChangeHandler,
        readonly,
    };

    return (
        <ToggleFeature name="isAppRedesigned" on={<ListBox {...props} />} off={<ListBoxDeprecated {...props} />} />

    );
};
