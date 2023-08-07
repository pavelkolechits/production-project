import { Card } from 'shared/ui/redesigned/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleAdditionalInfo } from 'widgets/ArticleAdditionalInfo';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import cls from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
    className?: string
}

export const AdditionalInfoContainer = (props: AdditionalInfoContainerProps) => {
    const { className } = props;
    const article = useSelector(getArticleDetailsData);
    if (!article) {
        return null;
    }
    return (
        <Card border="24" padding="24" className={cls.card}>
            <ArticleAdditionalInfo author={article.user} createdAt={article.createdAt} views={article.views} />
        </Card>
    );
};
