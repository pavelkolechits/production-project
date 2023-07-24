import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';
import { getArticles } from '../../model/slice/articlePageSlice';
import {
    getArticlePageError,
    getArticlePageInited,
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage';

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = ({ className }: ArticleInfiniteListProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const error = useSelector(getArticlePageError);
    const inited = useSelector(getArticlePageInited);
    const [serchParams] = useSearchParams();
    const { t } = useTranslation();

    if (error) {
        return <Text text={t('Ошибка при загрузке статей')} />;
    }
    return (
        <ArticleList className={className} isLoading={isLoading} view={view} articles={articles} />

    );
};
