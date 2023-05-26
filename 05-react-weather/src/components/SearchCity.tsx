import { useState } from 'react'

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

	const tooFewCharacters = city.trim().length > 0 && city.trim().length < 3


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
						disabled={city.length < 3}
						type="submit"
						className="btn btn-success"
					>🔍</button>


				</div>
				{tooFewCharacters && <div className="form-text">Please enter at least 3 characters</div>}
			</form>
		</div>
	)
}

export default SearchCity
