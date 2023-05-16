import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollPositionSaveSchema } from '../types/scrollPositionSaveSchema';

const initialState: ScrollPositionSaveSchema = {
    scroll: {},

};

export const scrollPositionSaveSlice = createSlice({
    name: 'scrollPositionSaveSlice',
    initialState,
    reducers: {
        setScrollPsition: (
            state,
            { payload }: PayloadAction<{path: string, position: number}>,
        ) => { state.scroll[payload.path] = payload.position; },
    },

});

export const { actions: scrollPositionSaveAction, reducer: scrollPositionSaveReducer } = scrollPositionSaveSlice;
