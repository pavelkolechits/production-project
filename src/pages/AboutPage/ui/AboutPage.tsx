import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Page } from 'shared/ui/Page/Page';

const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
        <Page>
            {t('О сайте')}
        </Page>
    );
};
export default memo(AboutPage);
