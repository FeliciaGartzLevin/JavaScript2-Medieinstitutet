export type Todo = {
	id?: number
	title: string
	completed: boolean
}
export type PartialTodo = Partial<Todo>

export type NewTodo = Omit<Todo, "id">

export type Todos = Todo[]

export type updateTodoVariables = {
	id: number
	updatedTodo: PartialTodo
}
