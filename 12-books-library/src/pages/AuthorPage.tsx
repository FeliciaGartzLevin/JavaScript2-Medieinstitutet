import { createColumnHelper } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
import useAuthors from '../hooks/useAuthors'
import TanstackBasicTable from '../components/TanstackBasicTable'
import { Author } from '../types/BooksAPI.types'

/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'date_of_birth',
		header: 'Date of birth',
	},
]
*/

const columnHelper = createColumnHelper<Author>()


const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name',
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth',
			}),
		],
	}),
	/*
	columnHelper.display({
		id: 'actions',
		cell: (props) => (
			<div className="flex justify-end">
				<button as={Link} to=' className="btn btn-sm btn-primary">View</button>
				<button className="btn btn-sm btn-warning ml-2">Edit</button>
			</div>
		),
	}) */
]

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

			{authors && <TanstackBasicTable columns={columns} data={authors} />}
		</>
	)
}

export default AuthorsPage
