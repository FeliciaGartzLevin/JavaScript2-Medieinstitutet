import { Reducer, createContext, useReducer } from 'react'
import {
	pointsReducer,
	initialState,
	PointsAction,
	PointsState,
} from '../reducers/pointsReducer'

type StoreContextType = {
	state: PointsState
	dispatch: React.Dispatch<PointsAction>
}

// create the store context
export const StoreContext = createContext<StoreContextType | null>(null)

type StoreContextProviderProps = {
	children: React.ReactNode
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContextProvider
