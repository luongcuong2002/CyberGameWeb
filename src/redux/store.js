import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice';
import systemVariableReducer from '../slices/system_variable.slice';
import modalAppearanceReducer from '../slices/modal_appearance.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        systemVariable: systemVariableReducer,
        modalAppearance: modalAppearanceReducer,
    },
});