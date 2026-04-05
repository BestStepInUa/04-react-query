import { useRef } from 'react'
import toast from 'react-hot-toast'
import css from './SearchBar.module.css'

interface SearchBarProps {
	onSubmit: (query: string) => void
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (formData: FormData) => {
		const queryValue = formData.get('query')
		const query = typeof queryValue === 'string' ? queryValue.trim() : ''

		if (!query) {
			toast.error('Please enter your search query.', { id: 'unique-toast' })
			inputRef.current?.focus()
			return
		}

		onSubmit(query)
		inputRef.current?.focus()
	}

	return (
		<header className={css.header}>
			<div className={css.container}>
				<a
					className={css.link}
					href='https://www.themoviedb.org/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by TMDB
				</a>
				<form className={css.form} action={handleSubmit}>
					<input
						ref={inputRef}
						className={css.input}
						type='text'
						name='query'
						autoComplete='off'
						placeholder='Search movies...'
						autoFocus
					/>
					<button className={css.button} type='submit'>
						Search
					</button>
				</form>
			</div>
		</header>
	)
}

