import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

interface Disciplines {
    discipline: Discipline[];
}
interface Discipline {
    name: string;
    course: string;
    semester: string;
}
