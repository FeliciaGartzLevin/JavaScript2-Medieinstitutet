/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo, TodoList } from '../types'

const BASE_URL = 'http://localhost:3000/todos/'

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get(`${BASE_URL}`)
	return res.data as TodoList
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await axios.post(`${BASE_URL}`, todo)
	return res.data as Todo
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const patchTodo = async <T>(endpoint: string, data: any) => {
	const res = await axios.patch<T>(BASE_URL + endpoint, data)
	return res.data as Todo
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const delTodo = async (endpoint: string) => {
	const res = await axios.delete(BASE_URL + endpoint)
	return res.data
}
