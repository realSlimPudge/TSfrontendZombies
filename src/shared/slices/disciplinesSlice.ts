import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

interface Disciplines {
    discipline: Discipline[];
}
export interface Discipline {
    name: string;
    course: string;
    semester: string;
}

interface DisciplinesState {
    data: Disciplines | null;
    loading: boolean;
    error: string | null;
}

const initialState: DisciplinesState = {
    data: null,
    loading: false,
    error: null,
};

export const getDisciplines = createAsyncThunk(
    "disciplines/getDisciplines",
    async (api) => {
        const response = await axios.get(
            `${server}/api/get_disciplines/${api}`
        );
        await console.log(response.data);
        return response.data;
    }
);

const disciplinesSlice = createSlice({
    name: "disciplines",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDisciplines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDisciplines.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDisciplines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unknown error";
            });
    },
});
export default disciplinesSlice.reducer;
