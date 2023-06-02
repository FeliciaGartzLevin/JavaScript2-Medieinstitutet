import { useEffect, useRef, useState } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-3">
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your search query"
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit">Search</Button>
				</div>
			</Form>

			{false && <p>🤔 Loading...</p>}

			{true && (
				<div id="search-result">
					<p>Showing HITS search result for QUERY</p>

					<ListGroup
						className='mb-3'
					>
						{[{}].map(hit => (
							<ListGroupItem
								action
								href={''}
								key={''}
							>
								<h2 className="h3">TITLE</h2>
								<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
							</ListGroupItem>
						))}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								variant='primary'
							>
								Previous Page
							</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button
								variant='primary'
							>
								Next Page
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SearchPage
