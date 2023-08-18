/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from 'axios'
import { HN_SearchResponse } from '../types/HN_Search.types'

const FAKE_DELAY = 2500

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://hn.algolia.com/api/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)

	// fake slow API if FAKE_DELAY is not falsy
	!!FAKE_DELAY && await new Promise(resolve => setTimeout(resolve, FAKE_DELAY))

	return response.data as T
}

/**
 * Search Hacker News stories
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const search = async (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search?query=${query}&tags=story&page=${page}`)
}

/**
 * Search Hacker News stories by date
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchByDate = async (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`)
}
