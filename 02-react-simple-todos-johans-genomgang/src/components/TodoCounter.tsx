import React from 'react'
import { TodoList } from '../types'

interface IProps {
	todos: TodoList
	finishedTodos: TodoList
}

const TodoCounter: React.FC<IProps> = ({ finishedTodos, todos }) => {
	return (
		<p className="status">
			{finishedTodos.length} of {todos.length} todos completed
		</p>
	)
}

export default TodoCounter
