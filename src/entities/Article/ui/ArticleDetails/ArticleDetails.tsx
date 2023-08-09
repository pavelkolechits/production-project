import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import {
    DynamicModuleLoader, ReducerList,
} from 'shared/lib/helpers/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/Skeleton';
import { Text as TextDeprecated, TextAlign, TextSize } from 'shared/ui/deprecated/Text/Text';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { Icon } from 'shared/ui/deprecated/Icon/Icon';
import { Text } from 'shared/ui/redesigned/Text/Text';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { AppImage } from 'shared/ui/redesigned/AppImage/AppImage';
import { ToggleFeature } from 'shared/features';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/Skeleton';
import {
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    getArticleDetailsData,
} from '../../model/selectors/articleDetail';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import EyeIcon from '../../../../shared/assets/icons/eyeIcon.svg';
import DataIcon from '../../../../shared/assets/icons/dataIcon.svg';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType } from '../../model/consts/consts';
import { renderArticleBlock } from './renderBlock';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <Avatar size={200} src={article?.img} className={cls.avatar} />
            </HStack>
            <VStack gap="4" max data-testid="ArticleDetails.Info">
                <TextDeprecated
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={DataIcon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size="l" bold />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={<Skeleton width="100%" height={420} borderRadius="16px" />}
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = ({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    let content;

    if (isLoading) {
        content = (
            <>
                <SkeletonDeprecated className={cls.avatar} width={200} height={200} borderRadius="50%" />
                <SkeletonDeprecated className={cls.title} width={300} height={32} />
                <SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
                <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
                <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    } else {
        content = (
            <ToggleFeature
                name="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>

    );
};
