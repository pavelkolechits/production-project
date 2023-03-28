import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo } from 'react';

interface LanguageSwitcherProps {
  className?: string;
  short: boolean;
}

export const LanguageSwitcher = memo(({ className, short }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ThemeButton.BACKGROUND_INVERTED}
            onClick={toggle}
        >
            {t(short ? 'Короткая версия' : 'Язык')}
        </Button>
    );
});
