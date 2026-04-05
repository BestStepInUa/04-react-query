import { useRef } from 'react'
import { Formik } from 'formik'
import toast from 'react-hot-toast'
import css from './SearchBar.module.css'

interface SearchBarProps {
	onSubmit: (query: string) => void
}

interface SearchBarFormValues {
	query: string
}

const INITIAL_VALUES: SearchBarFormValues = {
	query: '',
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (
		formData: FormData,
		resetForm: (nextState?: { values: SearchBarFormValues }) => void,
	) => {
		const queryValue = formData.get('query')
		const query = typeof queryValue === 'string' ? queryValue.trim() : ''

		if (!query) {
			toast.error('Please enter your search query.', { id: 'unique-toast' })
			inputRef.current?.focus()
			return
		}

		onSubmit(query)
		resetForm({ values: INITIAL_VALUES })
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
				<Formik<SearchBarFormValues> initialValues={INITIAL_VALUES} onSubmit={() => undefined}>
					{({ values, handleChange, resetForm }) => (
						<form className={css.form} action={(formData) => handleSubmit(formData, resetForm)}>
							<input
								ref={inputRef}
								className={css.input}
								type='text'
								name='query'
								value={values.query}
								onChange={handleChange}
								autoComplete='off'
								placeholder='Search movies...'
								autoFocus
							/>
							<button className={css.button} type='submit'>
								Search
							</button>
						</form>
					)}
				</Formik>
			</div>
		</header>
	)
}

