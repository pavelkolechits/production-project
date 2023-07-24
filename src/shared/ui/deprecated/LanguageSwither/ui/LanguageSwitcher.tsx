import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button, ThemeButton } from '../../Button/Button';

interface LanguageSwitcherProps {
  className?: string;
  short: boolean;
}

/**
 * Устарел, используем новый компанент из папки redesigned
 * @deprecated
 */

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
