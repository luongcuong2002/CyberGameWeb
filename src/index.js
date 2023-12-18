import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/slices/user.slice";
import systemVariableReducer from "../src/slices/system_variable.slice";
import modalAppearanceReducer from "../src/slices/modal_appearance.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    systemVariable: systemVariableReducer,
    modalAppearance: modalAppearanceReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
