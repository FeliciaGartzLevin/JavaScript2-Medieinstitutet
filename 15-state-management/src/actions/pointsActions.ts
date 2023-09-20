import { PointsActionTypes } from '../reducers/pointsReducer'

export const decreasePoints = (amount?: number) => {
	return { type: PointsActionTypes.DECREMENT, payload: { amount } }
}

export const increasePoints = (amount?: number) => {
	return { type: PointsActionTypes.INCREMENT, payload: { amount } }
}

export const reset = () => {
	return { type: PointsActionTypes.RESET }
}
