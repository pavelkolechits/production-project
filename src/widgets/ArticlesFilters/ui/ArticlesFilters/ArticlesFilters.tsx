import { Card } from 'shared/ui/redesigned/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { Tabs } from 'shared/ui/deprecated/TabItem/TabItem';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/lib/types';
import { Input } from 'shared/ui/deprecated/Input/Input';
import { useTranslation } from 'react-i18next';
import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSortField: (newField: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    type: ArticleType;
    onChangeType: (type: ArticleType) => void;
    search: string;
    onChangeSearch: (search: string) => void
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const {
        className, sort, order, onChangeOrder, onChangeSortField, onChangeType, type, search, onChangeSearch,
    } = props;
    const { t } = useTranslation();
    return (
        <Card className={classNames(cls.ArticlesFilters, {}, [className])}>
            <VStack gap="32">
                <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
                <ArticleTypeTabs
                    className={cls.tabs}
                    onChangeType={onChangeType}
                    value={type}
                />
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSortField={onChangeSortField}
                    order={order}
                    sort={sort}
                />

            </VStack>
        </Card>
    );
};
