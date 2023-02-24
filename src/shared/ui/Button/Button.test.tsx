import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';
import '@testing-library/jest-dom';

describe('button', () => {
    test('test', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('clear-theme', () => {
        // eslint-disable-next-line i18next/no-literal-string
        screen.debug();
        render(<Button theme={ThemeButton.CLEAR}>test</Button>);
        expect(screen.getByText('test')).toHaveClass('Button clear');
    });
});
