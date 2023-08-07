import { User } from 'entities/User';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Avatar } from 'shared/ui/redesigned/Avatar/Avatar';
import { Text } from 'shared/ui/redesigned/Text';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './ArticleAdditionalInfo.module.scss';

interface ArticleAdditionalInfoProps {
    className?: string;
    author?: User;
    createdAt?: string;
    views?: number;
}

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
    const {
        className, createdAt, author, views,
    } = props;
    const { t } = useTranslation();
    console.log(author);
    return (
        <VStack gap="32" className={classNames(cls.ArticleAdditionalInfo, {}, [className])}>
            <HStack gap="8">
                <Avatar src={author?.avatar} size={32} />
                <Text text={author?.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button>{t('Редактировать')}</Button>
            <Text text={t('{{count}} просмотров', { count: views })} />
        </VStack>
    );
};
