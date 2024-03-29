import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Select } from 'shared/ui/deprecated/Select/Select';
import { useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from 'shared/ui/deprecated/Popups';
import { ToggleFeature } from 'shared/features';
import { ListBox } from 'shared/ui/redesigned/Popups';
import { Currency } from '../../model/consts/consts';

interface CurrencySelectProps {
    className?: string
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}
const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = ({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    const props = {
        direction: 'top left' as const,
        defaultValue: t('Укажите валюту'),
        items: options,
        className: classNames('', {}, [className]),
        value,
        onChange: onChangeHandler,
        readonly,
    };

    return (
        <ToggleFeature name="isAppRedesigned" off={<ListBoxDeprecated {...props} />} on={<ListBox {...props} />} />

    );
};
