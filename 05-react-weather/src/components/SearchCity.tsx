import { useState } from 'react'
import { getCurrentWeather } from '../services/owmapi'

interface IProps {
	onSearch: (city: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {
	const [city, setCity] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// send city to App.tsx
		onSearch(city)

		// empty form
		setCity('')

	}

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => setCity(e.target.value)}
						value={city}
					/>

					<button
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>
			</form>
		</div>
	)
}

export default SearchCity
