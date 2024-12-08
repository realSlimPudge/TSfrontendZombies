import { configureStore } from "@reduxjs/toolkit";
import facultiesReducer from "../slices/facultiesSlice";
import disciplinesReducer from "../slices/disciplinesSlice";

const store = configureStore({
    reducer: {
        faculties: facultiesReducer,
        disciplines: disciplinesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
