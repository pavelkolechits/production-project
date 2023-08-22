import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/redesigned/Text';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Icon } from 'shared/ui/redesigned/Icon/Icon';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { Avatar } from 'shared/ui/redesigned/Avatar/Avatar';
import { memo } from 'react';
import { AppImage } from 'shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { AppLink } from 'shared/ui/redesigned/AppLink/AppLink';
import { getRouteArticleDetails } from 'shared/consts/router';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticlleListItem';
import EyeIcon from '../../../../../shared/assets/icons/eye.svg';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className, article, view, target,
    } = props;
    const { t } = useTranslation('article');

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const userInfo = (
        <>
            <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
            <Text bold text={article.user.username} />
        </>
    );
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack max gap="16">
                    <HStack justify="start" gap="8" max>
                        <Avatar size={32} src={article?.user?.avatar} />
                        <Text bold text={article?.user?.username} size="s" />
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text title={article.title} bold size="l" />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button size="m" variant="outline">
                                {t('Читать далее...')}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card} border="16">
                <AppImage
                    fallback={<Skeleton width={200} height={200} />}
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack className={cls.info} gap="4">
                    <Text title={article.title} className={cls.title} />
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
