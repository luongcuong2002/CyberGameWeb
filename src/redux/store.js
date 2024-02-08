import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice';
import systemVariableReducer from '../slices/system_variable.slice';
import modalAppearanceReducer from '../slices/modal_appearance.slice';
import userTableDataReducer from '../slices/user_table_data.slice';
import debtTableStateReducer from '../slices/debt_table_data.slice';
import scrollableManagementSlice from '../slices/scrollable_management.slice';
import topupRequestTableDataSlice from '../slices/topup_request_table_data.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        systemVariable: systemVariableReducer,
        modalAppearance: modalAppearanceReducer,
        userTableData: userTableDataReducer,
        debtTableState: debtTableStateReducer,
        topupRequestTableData: topupRequestTableDataSlice,
        scrollableManagement: scrollableManagementSlice,
    },
});