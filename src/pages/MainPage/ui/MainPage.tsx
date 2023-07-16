import { RatingCard } from 'entities/Rating';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';
import { StarRating } from 'shared/ui/StarRating/StarRating';

const MainPage = () => {
    const { t } = useTranslation('main');
    return (
        <Page>
            {t('Главная')}
            <RatingCard title={t('Как вам статья?')} hasFeedback feedbackTitle={t('Оставьте отзыв о статье')} />
        </Page>
    );
};

export default MainPage;
