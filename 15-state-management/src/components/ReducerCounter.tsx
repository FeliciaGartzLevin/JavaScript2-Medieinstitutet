import { Reducer, useReducer } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

enum PointsActionTypes {
	INCREMENT = "increment",
	DECREMENT = "decrement",
	RESET = "reset",
}

type PointsState = {
	points: number
	game: string
}

type PointsAction = {
	type: PointsActionTypes
	payload?: {
		amount: number | undefined
	}
}

const initialState: PointsState = {
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
const pointsReducer = (state: PointsState, action: PointsAction) => {
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

const decreasePoints = (amount?: number) => {
	return { type: PointsActionTypes.DECREMENT, payload: { amount } }
}

const increasePoints = (amount?: number) => {
	return { type: PointsActionTypes.INCREMENT, payload: { amount } }
}

const reset = () => {
	return { type: PointsActionTypes.RESET }
}


const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	return (
		<div className="counter">
			{/* Decrease points */}
			<ButtonGroup>
				<Button
					variant="warning"
					onClick={() => dispatch( decreasePoints(10) )}
				>-10</Button>
				<Button
					variant="warning"
					onClick={() => dispatch( decreasePoints(5) )}
				>-5</Button>
				<Button
					variant="warning"
					onClick={() => dispatch( decreasePoints() )}
				>-</Button>
			</ButtonGroup>

			{/* Current points */}
			<span className="points">{state.points}</span>

			{/* Increase points */}
			<ButtonGroup>
				<Button
					variant="success"
					onClick={() => dispatch( increasePoints() )}
				>+</Button>
				<Button
					variant="success"
					onClick={() => dispatch( increasePoints(5) )}
				>+5</Button>
				<Button
					variant="success"
					onClick={() => dispatch( increasePoints(10) )}
				>+10</Button>
			</ButtonGroup>

			{/* Make stuff go boom */}
			<Button
				className="ms-3"
				variant="danger"
				onClick={() => dispatch( { type: PointsActionTypes.INCREMENT } )}
			>💥</Button>

			{/* Reset state */}
			<Button
				className="ms-3"
				variant="danger"
				onClick={() => dispatch( reset() )}
			>🧹</Button>
		</div>
	)
}

export default ReducerCounter
