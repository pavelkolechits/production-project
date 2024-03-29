import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { ArticleRecomendationList } from 'features/ArticleRecomendationList';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { ArticleRating } from 'features/ArticleRating';
import { ToggleFeature } from 'shared/features';
import { StickyContentLayout } from 'shared/layouts';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsCommentReducer } from '../../model/slice/aticleDetailsCommentSlice';
import { articleDetailsPageRecomendationReducers } from '../../model/slice/articleDetailsPageRecomendationSlice';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentReducer,
    articleDetailsRecomendation: articleDetailsPageRecomendationReducers,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('Статья не найдена')} />
            </Page>
        );
    }

    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <StickyContentLayout
                    right={<AdditionalInfoContainer />}
                    content={(
                        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                                <VStack gap="16">
                                    <ArticleDetailsPageHeader />
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecomendationList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        </DynamicModuleLoader>
                    )}
                />
            )}
            off={(
                <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                        <VStack gap="16">
                            <ArticleDetailsPageHeader />
                            <ArticleDetails id={id} />
                            <ArticleRating articleId={id} />
                            <ArticleRecomendationList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                </DynamicModuleLoader>
            )}
        />

    );
};
export default memo(ArticleDetailsPage);
