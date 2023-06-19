import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { useArticleRecomendationList } from '../../api/articleRecomendationsApi';

interface ArticleRecomendationListProps {
    className?: string
}

export const ArticleRecomendationList = ({ className }: ArticleRecomendationListProps) => {
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecomendationList(3);
    if (isLoading || error || !articles) {
        return null;
    }
    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text text={t('Рекомендуем')} />
            <ArticleList articles={articles} />
        </VStack>
    );
};
