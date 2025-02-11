import { createSlice } from "@reduxjs/toolkit";

interface CurrentQuestions {
    questions: string[];
}

const initialState: CurrentQuestions = {
    questions: [],
};

export const currentQuestionsSlice = createSlice({
    name: "currentQuestions",
    initialState,
    reducers: {
        addQuestions: (state, action) => {
            state.questions.push(action.payload);
        },
        removeQuestions: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question !== action.payload
            );
        },
        clearAllQuestions: (state) => {
            state.questions = [];
        },
    },
});

export const { addQuestions, removeQuestions, clearAllQuestions } =
    currentQuestionsSlice.actions;
export default currentQuestionsSlice.reducer;
