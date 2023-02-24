import { Story } from '@storybook/react';
import 'app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

export const RouteDecorator = (story: () => Story) => (
    <BrowserRouter>{story()}</BrowserRouter>
);
