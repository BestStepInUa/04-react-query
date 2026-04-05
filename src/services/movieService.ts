import axios from 'axios'
import type { MoviesResponse } from '@/types/movie'

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL.replace(/\/$/, ''),
	params: {
		include_adult: false,
		language: 'en-US',
	},
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
	},
})

export const fetchMovies = async (
	query: string,
	page: number,
	signal?: AbortSignal,
): Promise<MoviesResponse> => {
	const { data } = await api.get<MoviesResponse>('', {
		params: {
			query,
			page,
		},
		signal,
	})

	return data
}

