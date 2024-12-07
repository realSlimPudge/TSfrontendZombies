import { configureStore } from "@reduxjs/toolkit";
import facultiesReducer from "../slices/facultiesSlice";

const store = configureStore({
    reducer: {
        faculties: facultiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
