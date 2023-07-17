import { Card } from 'shared/ui/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { useCallback, useState } from 'react';
import { Modal } from 'shared/ui/Modal';
import { Input } from 'shared/ui/Input/Input';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
// import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsNumber: number) => void;
    onAccept?: (starsNumber: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className, title, feedbackTitle, hasFeedback, onAccept, onCancel, rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);
    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);
    const cancelHandler = useCallback(() => {
        onCancel?.(starsCount);
        setIsModalOpen(false);
    }, [onCancel, starsCount]);
    return (
        <Card className={classNames('', {}, [className])}>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Спасибо за оценку!') : title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        <Text title={feedbackTitle} />
                        <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
                        <HStack max gap="32">
                            <Button onClick={acceptHandler} theme={ThemeButton.OUTLINE}>
                                {t('Отправить')}
                            </Button>
                            <Button onClick={cancelHandler} theme={ThemeButton.OUTLINE}>
                                {t('Отменить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </VStack>
        </Card>
    );
};
