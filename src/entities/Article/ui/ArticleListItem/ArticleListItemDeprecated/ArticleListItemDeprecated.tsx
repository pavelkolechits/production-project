import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteArticleDetails } from 'shared/consts/router';
import { Card } from 'shared/ui/deprecated/Card/Card';
import { Avatar } from 'shared/ui/deprecated/Avatar/Avatar';
import { Text } from 'shared/ui/deprecated/Text/Text';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Icon } from 'shared/ui/deprecated/Icon/Icon';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItemDeprecated.module.scss';
import { ArticleListItemProps } from '../ArticlleListItem';
import EyeIcon from '../../../../../shared/assets/icons/eyeIcon.svg';

export const ArticleListItemDeprecated = (props: ArticleListItemProps) => {
    const { article, view, className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onOpenArticle = useCallback(() => {
        navigate(getRouteArticleDetails(article.id));
    }, [article.id, navigate]);
    if (view === ArticleView.BIG) {
        // eslint-disable-next-line prefer-const
        let textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(cls.ArticlleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar alt="/" size={30} src={article?.user?.avatar} />
                        <Text text={article?.user?.username} className={cls.username} />
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
        <div className={classNames(cls.ArticlleListItem, {}, [className, cls[view]])}>
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
