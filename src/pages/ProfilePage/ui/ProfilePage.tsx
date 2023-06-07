import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation();
    if (!id) {
        return <Text text={t('Профиль не найден')} />;
    }
    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard id={id} />
        </Page>

    );
};
export default ProfilePage;
