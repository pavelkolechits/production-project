import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[];
    value?: string;
    onChangeValue?: (value: string) => void;
    readonly?: boolean;
}

export const Select = (props: SelectProps) => {
    const {
        className, label, options, value, onChangeValue, readonly,
    } = props;
    const { t } = useTranslation();
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeValue?.(e.target.value);
    };

    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ));
    }, [options]);

    return (
        <div className={classNames(cls.Wrapp, {}, [className])}>
            {label
            && <span className={classNames(cls.label, { [cls.readonly]: readonly }, [])}>{label}</span>}
            <select onChange={onChangeHandler} disabled={readonly} value={value} className={cls.select} name="" id="">
                {optionList}
            </select>
        </div>
    );
};
