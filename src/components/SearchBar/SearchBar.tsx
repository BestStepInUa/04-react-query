import { Field, Form, Formik, type FormikHelpers } from 'formik'
import toast from 'react-hot-toast'
import css from './SearchBar.module.css'

interface SearchBarProps {
	onSubmit: (query: string) => void
	initialQuery: string
}

interface SearchBarFormValues {
	query: string
}

export default function SearchBar({ onSubmit, initialQuery }: SearchBarProps) {
	const handleSubmit = (
		values: SearchBarFormValues,
		{ setSubmitting }: FormikHelpers<SearchBarFormValues>,
	) => {
		const query = values.query.trim()

		if (!query) {
			toast.error('Please enter your search query.', { id: 'unique-toast' })
			setSubmitting(false)
			return
		}

		onSubmit(query)
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
				<Formik<SearchBarFormValues>
					initialValues={{ query: initialQuery }}
					enableReinitialize
					onSubmit={handleSubmit}
				>
					<Form className={css.form}>
						<Field
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

