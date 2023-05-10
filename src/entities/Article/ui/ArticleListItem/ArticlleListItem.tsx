import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/helpers/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '../../../../shared/assets/icons/eyeIcon.svg';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticlleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticlleListItem = (props: ArticlleListItemProps) => {
    const { article, view, className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);
    if (view === ArticleView.BIG) {
        // eslint-disable-next-line prefer-const
        let textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(cls.ArticlleListItem, {}, [className])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar alt="/" size={30} src={article.user.id} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    <Text className={cls.types} text={article.type.join(',')} />
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
                    <div className={cls.footer}>
                        <Button onClick={onOpenArticle} theme={ThemeButton.OUTLINE}>{t('Читать далее...')}</Button>
                        <Text text={String(article.views)} className={cls.views} />
                        <Icon Svg={EyeIcon} />
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticlleListItem, {}, [className])}>
            <Card onClick={onOpenArticle} className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img className={cls.img} src={article.img} alt={article.title} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text className={cls.types} text={article.type.join(',')} />
                    <Text text={String(article.views)} className={cls.views} />
                    <Icon Svg={EyeIcon} />
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </div>
    );
};
