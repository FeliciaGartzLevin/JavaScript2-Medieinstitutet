import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo, TodoList } from '../types'


interface IProps {
	onToggle: (todo: Todo) => void
	onDelete: (todoToDelete: Todo) => void
	todos: TodoList
}

const ATodoList: React.FC<IProps> = ({ todos, onToggle, onDelete }) => {
	return (
		<ul className="todolist">
			{todos.map((todo, index) => (
				<TodoListItem
					onToggle={onToggle}
					onDelete={onDelete}
					todo={todo}
					key={index}
				/>
			))}
		</ul>
	)
}

export default ATodoList
