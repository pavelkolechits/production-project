import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    intialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, intialState, asyncReducers } = props;

    const store = createReduxStore(
        intialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    );
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
