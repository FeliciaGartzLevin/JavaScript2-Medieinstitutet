import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { searchByDate as HN_search } from '../services/HackerNewsAPI'
import { useQuery } from '@tanstack/react-query'
import Pagination from '../components/Pagination'
const SearchHackerNewsPage = () => {
	const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState("")
	const [searchParams, setSearchParams] = useSearchParams()

	// get "query=" from URL Search Params
	const query = searchParams.get("query") ?? ''

	const HackerNewsSearch = useQuery(
		['search-hn', { query, page }],
		() => HN_search(query, page),
		{
			enabled: !!query,
			keepPreviousData: true,
		}
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// haxx0r
		if (!searchInput.trim().length) {
			return
		}

		// reset page state
		setPage(0)

		// set input value as query in searchParams
		setSearchParams({ query: searchInput })    // ?query=tesla
	}


	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{HackerNewsSearch.isError && <Alert variant='warning'>Ooops, something went wrong!</Alert>}

			{HackerNewsSearch.data && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(HackerNewsSearch.data.nbHits)} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{HackerNewsSearch.data.hits.map(hit => (
							<ListGroup.Item
								action
								href={hit.url}
								key={hit.objectID}
							>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">
									{hit.points} points by {hit.author} at {hit.created_at}
								</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						page={HackerNewsSearch.data.page + 1}
						totalPages={HackerNewsSearch.data.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < HackerNewsSearch.data.nbPages}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
					/>
				</div>
			)}
		</>
	)
}

export default SearchHackerNewsPage
