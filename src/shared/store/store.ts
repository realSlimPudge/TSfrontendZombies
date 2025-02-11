import { configureStore } from "@reduxjs/toolkit";
import facultiesReducer from "../slices/facultiesSlice";
import disciplinesReducer from "../slices/disciplinesSlice";
import roadmapReducer from "../slices/roadmapSlice";
import currentQuestions from "../slices/currentQuestionsSlice";

const store = configureStore({
    reducer: {
        faculties: facultiesReducer,
        disciplines: disciplinesReducer,
        roadmap: roadmapReducer,
        currentQuestions: currentQuestions,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
