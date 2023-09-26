import React from 'react'

type TodoCounterProps = {
	count: number
}

const TodoCounter: React.FC<TodoCounterProps> = ({ count }) => {
	const msg = count
		? count === 1
			? <p>You only have 1 todo left, get on it 🤩!</p>
			: <p>You have {count} todos left 😩</p>
		: <p>You have 0 todos 🥳!</p>

	return (
		<div className="todo-counter mt-2" data-testid="todo-counter">
			{msg}
		</div>
	)
}

export default TodoCounter
