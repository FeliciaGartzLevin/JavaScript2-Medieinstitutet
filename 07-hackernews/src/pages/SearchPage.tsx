import { useEffect, useRef, useState } from 'react'
import { Alert, ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types'
import PageNavigation from '../components/PageNavigation'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>('')
	const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	// const queryRef = useRef('')
	// get "query=" from URL Search Params instead of queryRef
	const query = searchParams.get("query")

	const searchHackerNews = async (searchQuery: string, searchPage: number = 0 /* default-värde */) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		// // save searchQuery to queryRef
		// queryRef.current = searchQuery

		try {
			const res = await searchByDate(searchQuery, searchPage)
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
		// reset page state
		setPage(0)

		// set input value as query in searchParams
		setSearchParams({ query: searchInput })    // ?query=apple


		// // searchHN
		// searchHackerNews(searchInput, 0)
		// denna hämtning behövs ej då useEffect nedan har query som dependency
		// så varje gång man submittar så kör denna funktion
		// `setSearchParams({ query: searchInput }) ` vilket kallar på hämtningen.

	}

	// handle clicking next or prev page
	const pageSwitcher = (directionNumber: number) => {
		setPage(prevValue => prevValue + directionNumber)
	}

	// react to changes in our page state
	useEffect(() => {
		if (!query) return

		searchHackerNews(query, page)
	}, [query, page])

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

					<p>Showing {searchResult.nbHits} search result for {query}</p>

					<PageNavigation
						page={page}
						currentPage={searchResult.page}
						maxPage={searchResult.nbPages}
						pageSwitcher={pageSwitcher}
					/>

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

					<PageNavigation
						page={page}
						currentPage={searchResult.page}
						maxPage={searchResult.nbPages}
						pageSwitcher={pageSwitcher}
					/>

					{/* Gammal kod som blev componenten PageNavigation
					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								disabled={page === 0}
								onClick={() => pageSwitcher(-1)}
								variant='primary'
							>
								Previous Page
							</Button>
						</div>

						<div className="page">{searchResult.page + 1}/{searchResult.nbPages}</div>

						<div className="next">
							<Button
								disabled={page + 1 >= searchResult.nbPages}
								onClick={() => pageSwitcher(+1)}
								variant='primary'
							>
								Next Page
							</Button>
						</div>
					</div> */}
				</div >
			)}
		</>
	)
}

export default SearchPage
