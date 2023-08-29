import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Book } from '../types/BooksAPI.types'

interface IProps {
	books: Book[]
}

const BookList: React.FC<IProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>
	}

	return (
		<ListGroup>
			{books.map(book => (
				<ListGroup.Item key={book.id}>
					<div>{book.title}</div>
					<div className="text-small text-muted">
						Author: {book.author.name} | Pages: {book.pages} | Published: {book.published}
					</div>
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export default BookList
