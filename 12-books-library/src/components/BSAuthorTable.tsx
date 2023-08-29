import React from 'react'
import Table from 'react-bootstrap/Table'
import { Author } from '../types/BooksAPI.types'

type Props = {
	authors: Author[]
}

const BSAuthorTable: React.FC<Props> = ({ authors }) => {
	return (
		<Table responsive striped>
			<thead>
				<tr>
					<td>Name</td>
					<td>Birthdate</td>
				</tr>
			</thead>
			<tbody>
				{authors.map(author => (
					<tr>
						<td>{author.name}</td>
						<td>{author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSAuthorTable
