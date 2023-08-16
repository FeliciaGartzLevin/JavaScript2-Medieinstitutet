import axios from 'axios'
import { CatImgResponse } from '../types'


const FAKE_DELAY = 2500


// Create a new axios instance
const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1",
	timeout: 0,
	headers: {
		"x-api-key": import.meta.env.API_KEY
	}
})


/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)

	// fake slow API if FAKE_DELAY is not falsy
	!!FAKE_DELAY && await new Promise(resolve => setTimeout(resolve, FAKE_DELAY))

	return response.data
}

/**
 * Get a random cat img
 *
 * @returns Promise
 */
export const getRandomCat = () => {
	return get<CatImgResponse[]>("/images/search/")
}
