export enum PointsActionTypes {
	INCREMENT = "increment",
	DECREMENT = "decrement",
	RESET = "reset",
}

export type PointsState = {
	points: number
	game: string
}

export type PointsAction = {
	type: PointsActionTypes
	payload?: {
		amount: number | undefined
	}
}

export const initialState: PointsState = {
	points: 0,
	game: "Hackers vs Plebs"
}

/**
 * Reduce a new state based on the action and current state
 *
 * @param state Current state
 * @param action Action to take on the state
 * @returns New state
 */
export const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state = current state
	// action = { type: "increment" }

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			return {
				...state,
				points: state.points - (action.payload?.amount ?? 1),
			}

		case PointsActionTypes.INCREMENT:
			return {
				...state,
				points: state.points + (action.payload?.amount ?? 1),
			}

		case PointsActionTypes.RESET:
			return initialState

		default:
			return state
	}
}
