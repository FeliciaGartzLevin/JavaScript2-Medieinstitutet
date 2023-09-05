export type Todo = {
	_id: string
	title: string
	completed: boolean
}
export type NewTodo = Omit<Todo, "_id">
export type PartialTodo = Partial<Todo>

export type Todos = Todo[]
