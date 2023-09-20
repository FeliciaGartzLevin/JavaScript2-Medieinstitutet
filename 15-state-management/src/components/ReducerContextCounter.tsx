import Button from 'react-bootstrap/Button'
import useStore from '../hooks/useStore'
import { decreasePoints, increasePoints } from '../actions/pointsActions'

const ReducerContextCounter = () => {
	const { state, dispatch } = useStore()

	return (
		<div className="counter">
			<Button
				variant="warning"
				onClick={() => dispatch( decreasePoints() )}
			>-</Button>

			<span className="points">{state.points}</span>

			<Button
				variant="success"
				onClick={() => dispatch( increasePoints() )}
			>+</Button>
		</div>
	)
}

export default ReducerContextCounter
