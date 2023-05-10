import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import ArticleDetailsPage from 'pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage';
import { ArticleList } from 'entities/Article';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            <ArticleList articles={[]} />
        </div>
    );
};

export default ArticlePage;
