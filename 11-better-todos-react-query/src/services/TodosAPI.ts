/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { PartialTodo, Todo, Todos } from '../types/TodosAPI.types'

const BASE_URL = 'http://localhost:3000'
const FAKE_DELAY = 2500

// Create a new axios instance
const instance = axios.create({
	baseURL: BASE_URL,
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
	const response = await instance.get<T>(endpoint)

	// Simulate a delay
	!!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

	return response.data
}

/**
 * Get all todos
 */
export const getTodos = () => {
	return get<Todos>(`/todos`)

}

/**
 * Get a single todo
 *
 * @param todo_id Todo ID to get
 */
export const getTodo = async (todo_id: number) => {
	return get<Todo>('/todos/' + todo_id)
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await axios.post(`${BASE_URL}/todos`, todo)
	return res.data as Todo
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todo_id: number, data: PartialTodo) => {
	const res = await axios.patch(`${BASE_URL}/todos/${todo_id}`, data)
	return res.data as Todo
}

export const toggleTodo = async (todo: Todo) => {
	const res = await axios.patch(`${BASE_URL}/todos/${todo.id}`, todo)
	return res.data as Todo
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todo_id: number) => {
	const res = await axios.delete(`${BASE_URL}/todos/${todo_id}`)
	return res.data
}
