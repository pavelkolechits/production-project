import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

describe('button', () => {
    test('test', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('clear-theme', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button className="clear">test</Button>);
        screen.debug();
        expect(screen.getByText('test')).toHaveClass('clear');
    });
});
