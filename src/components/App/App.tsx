import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import { fetchMovies } from '@/services/movieService'
import type { Movie } from '@/types/movie'
import SearchBar from '../SearchBar'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import MovieGrid from '../MovieGrid'
import MovieModal from '../MovieModal'
import Pagination from '../Pagination'
import css from './App.module.css'

export default function App() {
	const [query, setQuery] = useState('')
	const [page, setPage] = useState(1)
	const [activeMovie, setActiveMovie] = useState<Movie | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const lastToastQueryRef = useRef('')

	const { data, isError, isPending, refetch } = useQuery({
		queryKey: ['movies', query, page],
		queryFn: ({ signal }) => fetchMovies(query, page, signal),
		enabled: query.trim().length > 0,
		placeholderData: (previousData, previousQuery) => {
			const previousQueryValue = previousQuery?.queryKey[1]

			return previousQueryValue === query ? previousData : undefined
		},
	})

	const handleSubmit = (nextQuery: string) => {
		if (nextQuery === query && page === 1) {
			void refetch()
			closeModal()
			return
		}

		setQuery(nextQuery)
		setPage(1)
		closeModal()
	}

	const openModal = (movie: Movie) => {
		setActiveMovie(movie)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setActiveMovie(null)
		setIsModalOpen(false)
	}

	useEffect(() => {
		if (!query || !data || page !== 1) return
		if (lastToastQueryRef.current === query) return

		if (data.results.length === 0) {
			toast.error('No movies found for your request.', { id: 'unique-toast' })
			lastToastQueryRef.current = query
			return
		}

		toast.success('Successfully loaded movies.', { id: 'unique-toast' })
		lastToastQueryRef.current = query
	}, [data, page, query])

	useEffect(() => {
		if (!isError) return

		toast.error('Whoops, something went wrong! Please try again!', { id: 'unique-toast' })
	}, [isError])

	const movies = data?.results ?? []
	const totalPages = data?.total_pages ?? 0
	const hasMovies = movies.length > 0
	const hasQuery = query.trim().length > 0
	const isLoading = hasQuery && isPending && !data

	return (
		<div className={css.app}>
			<SearchBar onSubmit={handleSubmit} />

			{isLoading && <Loader />}
			{isError && <ErrorMessage />}
			{totalPages > 1 && (
				<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
			)}
			{hasMovies && <MovieGrid movies={movies} onSelect={openModal} />}
			{isModalOpen && activeMovie && <MovieModal movie={activeMovie} onClose={closeModal} />}
			<div>
				<Toaster
					position='top-center'
					reverseOrder={false}
					toastOptions={{
						success: {
							style: {
								background: '#6bcb77',
								color: 'white',
							},
						},
						error: {
							style: {
								background: '#ff6b6b',
								color: 'white',
							},
						},
					}}
				/>
			</div>
		</div>
	)
}

