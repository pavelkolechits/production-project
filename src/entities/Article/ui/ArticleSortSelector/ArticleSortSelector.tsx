import { Select, SelectOptions } from 'shared/ui/deprecated/Select/Select';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { SortOrder } from 'shared/lib/types';
import { ToggleFeature } from 'shared/features';
import { ListBox } from 'shared/ui/redesigned/Popups';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from 'shared/ui/redesigned/Text';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '../../model/consts/consts';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSortField: (newField: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSortField,
    } = props;
    const { t } = useTranslation();
    const orderOptions = useMemo<SelectOptions[]>(() => [
        { value: 'asc', content: t('возрастанию') },
        { value: 'desc', content: t('убыванию') },
    ], [t]);
    const sortFildsOptions = useMemo<SelectOptions[]>(() => [
        { value: ArticleSortField.CREATED, content: t('дате создания') },
        { value: ArticleSortField.TITLE, content: t('названию') },
        { value: ArticleSortField.VIEWS, content: t('количеству просмотров') },
    ], [t]);
    const onChangeSortHandler = useCallback((newSort: string) => {
        onChangeSortField(newSort as ArticleSortField);
    }, [onChangeSortField]);
    const onChangeOrderHandler = useCallback((newSort: string) => {
        onChangeOrder(newSort as SortOrder);
    }, [onChangeOrder]);
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
                    <VStack gap="8">
                        <Text title={t('Сортировать по:')} />
                        <ListBox
                            value={sort}
                            onChange={onChangeSortHandler}
                            items={sortFildsOptions}
                        />
                        <ListBox
                            value={order}
                            onChange={onChangeOrderHandler}
                            items={orderOptions}
                        />
                    </VStack>
                </div>
            )}
            off={(
                <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
                    <Select
                        value={sort}
                        onChangeValue={onChangeSortHandler}
                        options={sortFildsOptions}
                        label={t('Сортировать по')}
                    />
                    <Select
                        value={order}
                        onChangeValue={onChangeOrderHandler}
                        options={orderOptions}
                        label={t('по')}
                        className={cls.order}
                    />
                </div>
            )}
        />

    );
};
