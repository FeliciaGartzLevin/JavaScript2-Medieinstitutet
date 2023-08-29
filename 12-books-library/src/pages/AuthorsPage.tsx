import WarningAlert from '../components/alerts/WarningAlert'
import AuthorList from '../components/AuthorList'
import BSAuthorTable from '../components/BSAuthorTable'
import useAuthors from '../hooks/useAuthors'

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{/* {authors && <AuthorList authors={authors} />} */}

			{authors && <BSAuthorTable authors={authors} />}
		</>
	)
}

export default AuthorsPage
