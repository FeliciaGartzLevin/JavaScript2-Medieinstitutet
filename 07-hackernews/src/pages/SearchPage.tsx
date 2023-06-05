import { useEffect, useRef, useState } from 'react'
import { Alert, ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types'

const SearchPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>('')
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null)
	const queryRef = useRef<string | null>(null)

	const searchHackerNews = async (searchQuery: string, page: number = 0 /* default-värde */) => {
		setError(null)
		setLoading(true)

		// save searchQuery to queryRef
		queryRef.current = searchQuery

		try {
			const res = await searchByDate(searchQuery, page)
			setSearchResult(res)

		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// haxx0r
		if (!searchInput.trim().length) {
			return
		}

		// searchHN
		searchHackerNews(searchInput)


	}

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-3" onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Enter your search query"
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit" disabled={!searchInput.trim().length}>Search</Button>
				</div>
			</Form>

			{error && <Alert variant='warning'>{error}</Alert>}

			{loading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search result for {queryRef.current}</p>

					<ListGroup
						className='mb-3'
					>
						{searchResult.hits.map(hit => (<ListGroupItem
							action
							href={hit.url}
							key={hit.objectID}
						>
							<h2 className="h3">{hit.title}</h2>
							<p className="text-muted small mb-0">
								{hit.points} points by {hit.author} at {hit.created_at}
							</p>
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
