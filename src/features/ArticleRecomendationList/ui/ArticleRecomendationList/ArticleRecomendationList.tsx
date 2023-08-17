import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { ToggleFeature } from 'shared/features';
import { Text } from 'shared/ui/redesigned/Text';
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
            <ToggleFeature
                name="isAppRedesigned"
                on={<Text title={t('Рекомендуем')} />}
                off={<TextDeprecated text={t('Рекомендуем')} />}
            />
            <ArticleList target="_blank" articles={articles} />
        </VStack>
    );
};
