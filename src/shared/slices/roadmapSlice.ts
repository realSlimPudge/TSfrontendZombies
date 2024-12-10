import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const server = import.meta.env.VITE_SERVER

interface topics {
	topics: string[]
}
interface category {
	name: string
	topics: topics[]
}
interface roadmapState {
	data: category[] | null
	loading: boolean
	error: string | null
}
const initialState: roadmapState = {
	data: null,
	loading: false,
	error: null,
}

export const getRoadmap = createAsyncThunk(
	'roadmap/getRoadmap',
	async roadmap => {
		const response = await axios.get(`${server}/api/roadmaps/${roadmap}`)
		await console.log(response.data.categories)
		return response.data.categories
	}
)

const roadmapSlice = createSlice({
	name: 'roadmap',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getRoadmap.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(getRoadmap.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(getRoadmap.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Unknown error'
			})
	},
})
export default roadmapSlice.reducer
