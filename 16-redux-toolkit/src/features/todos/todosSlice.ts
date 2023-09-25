import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../../types/Todo.types"
import { dummyTodos } from "../../data/todos"

// const initialState: Todo[] = []
const initialState: Todo[] = dummyTodos

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.push(action.payload)
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find((todo) => todo.id === action.payload)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		remove: (state, action: PayloadAction<string>) => {
			return state.filter(todo => todo.id !== action.payload)
			// const todoIndex = state.findIndex((todo) => todo.id === action.payload)
			// if (todoIndex) {
			// 	state.splice(todoIndex, 1)
			// }
		}
	},
})

// Action creators are generated for each reducer function
export const { add, toggle, remove } = todosSlice.actions

// Export the reducer
export default todosSlice.reducer
