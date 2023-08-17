import { Card as CardDeprecated } from 'shared/ui/deprecated/Card/Card';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { VStack } from 'shared/ui/redesigned/Stack/VStack/VStack';
import { useTranslation } from 'react-i18next';
import { Text as TextDepreacetd } from 'shared/ui/deprecated/Text/Text';
import { StarRating } from 'shared/ui/redesigned/StarRating/StarRating';
import { useCallback, useState } from 'react';
import { Modal } from 'shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/Input';
import { HStack } from 'shared/ui/redesigned/Stack/HStack/HStack';
import { Button as ButtonDeprecated, SizeButton, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { ToggleFeature } from 'shared/features';
import { Input } from 'shared/ui/redesigned/Input/Input';
import { Text } from 'shared/ui/redesigned/Text';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from 'shared/ui/redesigned/Drawer/Drawer';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Card } from 'shared/ui/redesigned/Card/Card';
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
    const modalContent = (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            )}
            off={(
                <>
                    <TextDepreacetd title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            )}
        />
    );
    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeature
                    name="isAppRedesigned"
                    on={(
                        <Text
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    )}
                    off={(
                        <TextDepreacetd
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    )}
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeature
                            name="isAppRedesigned"
                            on={(
                                <HStack max gap="16" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandler}
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                    <Button
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandler}
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            )}
                            off={(
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandler}
                                        theme={ThemeButton.OTLINE_ERROR}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandler}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeature
                            name="isAppRedesigned"
                            on={(
                                <Button
                                    fullWidth
                                    onClick={acceptHandler}
                                    size="l"
                                >
                                    {t('Отправить')}
                                </Button>
                            )}
                            off={(
                                <ButtonDeprecated
                                    onClick={acceptHandler}
                                    size={SizeButton.L}
                                >
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            )}
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );
    return (
        <ToggleFeature
            name="isAppRedesigned"
            on={(
                <Card max border="16" padding="24">
                    {content}
                </Card>
            )}
            off={(
                <CardDeprecated
                    className={className}
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            )}
        />
    );
};
