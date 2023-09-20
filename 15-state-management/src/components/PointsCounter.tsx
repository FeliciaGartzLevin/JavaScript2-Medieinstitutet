import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const PointsCounter = () => {
	const [points, setPoints] = useState(0)

	const modifyPoints = (amount: number) => {
		setPoints(prevPoints => prevPoints + amount)
	}

	return (
		<div className="counter">
			<Button variant="warning" onClick={() => modifyPoints(-1)}>-</Button>

			<span className="points">{points}</span>

			<Button variant="success" onClick={() => modifyPoints(+1)}>+</Button>
		</div>
	)
}

export default PointsCounter
