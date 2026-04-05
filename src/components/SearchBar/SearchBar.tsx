import { useRef } from 'react'
import { Field, Form, Formik, type FormikHelpers } from 'formik'
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
		values: SearchBarFormValues,
		{ resetForm, setSubmitting }: FormikHelpers<SearchBarFormValues>,
	) => {
		const query = values.query.trim()

		if (!query) {
			toast.error('Please enter your search query.', { id: 'unique-toast' })
			inputRef.current?.focus()
			setSubmitting(false)
			return
		}

		onSubmit(query)
		resetForm()
		inputRef.current?.focus()
		setSubmitting(false)
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
				<Formik<SearchBarFormValues> initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
					<Form className={css.form}>
						<Field
							innerRef={inputRef}
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
					</Form>
				</Formik>
			</div>
		</header>
	)
}

