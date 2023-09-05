export type Todo = {
	id: string
	title: string
	completed: boolean
}
export type NewTodo = Omit<Todo, "id">
export type PartialTodo = Partial<Todo>

export type Todos = Todo[]
