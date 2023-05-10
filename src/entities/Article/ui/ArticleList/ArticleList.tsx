import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticlleListItem } from '../ArticleListItem/ArticlleListItem';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className, articles, isLoading, view = ArticleView.SMALL,
    } = props;
    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));
    const renderArticle = (article: Article) => {
        return <ArticlleListItem article={article} view={view} key={article.id} />;
    };
    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {articles.length > 0 ? articles.map(renderArticle) : null}
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    );
};
