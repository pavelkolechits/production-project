import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useNavigate } from 'react-router-dom';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { HTMLAttributeAnchorTarget } from 'react';
import { ToggleFeature } from 'shared/features';
import { Article } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticlleListItem } from '../ArticleListItem/ArticlleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView } from '../../model/consts/consts';

interface ArticleListProps {
    className?: string
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
        <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = (props: ArticleListProps) => {
    const { t } = useTranslation();
    const {
        className, articles, isLoading, view = ArticleView.BIG, target,
    } = props;

    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticlleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            )}
            off={(
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticlleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </div>
            )}
        />
    );
};
