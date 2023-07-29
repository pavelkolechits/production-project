import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { getArticleDetailsData } from 'entities/Article';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { getRouteArticles } from 'shared/consts/router';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    // const onEditArticle = useCallback(() => {
    //     navigate(`${RoutePath.article_details}${article?.id}/edit`);
    // }, [article?.id, navigate]);

    return (
        <HStack justify="between" className={classNames('', {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {/* {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )} */}
        </HStack>
    );
});
