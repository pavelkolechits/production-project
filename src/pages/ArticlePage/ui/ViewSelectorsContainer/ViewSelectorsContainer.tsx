import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { articlePageAction } from '../../model/slice/articlePageSlice';
import { getArticlePageView } from '../../model/selectors/articlePageSelectors';
import { useArticleFilters } from '../ArticlePage/lib/hoocs/useArticleFilters';

interface ViewSelectorsContainerProps {
    className?: string
}

export const ViewSelectorsContainer = ({ className }: ViewSelectorsContainerProps) => {
    const { view, onViewClick } = useArticleFilters();
    return (

        <ArticleViewSelector
            className={classNames('', {}, [className])}
            view={view}
            onViewClick={onViewClick}
        />
    );
};
