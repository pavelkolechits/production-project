import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    intialState?: StateSchema
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, intialState } = props;
    const store = createReduxStore(intialState);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
