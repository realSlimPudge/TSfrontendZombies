import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

//Типизирование
export interface Direction {
    name: string;
    subjects: string[];
}

export interface Faculty {
    _id: string;
    title: string;
    directions: Direction[];
}

interface FacultiesState {
    currentFaculty: Faculty | null;
    currentDirection: Direction | null;
    data: Faculty[] | null;
    loading: boolean;
    error: string | null;
}

//Начальное состояние
const initialState: FacultiesState = {
    currentFaculty: null,
    currentDirection: null,
    data: null,
    loading: false,
    error: null,
};

//Async func
export const getFaculties = createAsyncThunk(
    "faculties/getFaculties",
    async () => {
        const response = await axios.get(`${server}/api/faculties`);
        return response.data;
    }
);

//Редьюсер
const facultiesSlice = createSlice({
    name: "faculties",
    initialState,
    reducers: {
        setCurrentFaculty: (state, action) => {
            const facultyId = action.payload;
            state.currentFaculty =
                state.data?.find((faculty) => faculty._id === facultyId) ||
                null;
            state.currentDirection = null;
        },
        setCurrentDirection: (state, action) => {
            if (state.currentFaculty) {
                const directionName = action.payload;
                const foundDirection = state.currentFaculty.directions.find(
                    (direction: Direction) => direction.name === directionName
                );
                state.currentDirection = foundDirection || null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFaculties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFaculties.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getFaculties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unknown error";
            });
    },
});

export const { setCurrentFaculty, setCurrentDirection } =
    facultiesSlice.actions;
export default facultiesSlice.reducer;
