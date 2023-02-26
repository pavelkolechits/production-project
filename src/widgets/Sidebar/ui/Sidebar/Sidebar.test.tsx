import { fireEvent, render, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import '@testing-library/jest-dom';
import { renderWithTranslation } from 'shared/lib/helpers/tests/renderWithTranslation';
import { componentRender } from 'shared/lib/helpers/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('sidebar', () => {
    test('test', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('test toggle', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
