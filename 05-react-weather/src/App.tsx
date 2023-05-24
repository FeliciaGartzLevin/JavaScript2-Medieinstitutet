import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)

	const getWeather = async (city: string) => {

		try {
			const data = await getCurrentWeather(city)
			console.log(data)

			setCurrentWeather(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div id="app" className="container">
			<SearchCity
				onSearch={getWeather}
			/>

			{currentWeather && <Forecast
				weather={currentWeather}
			/>
			}
		</div>
	)
}

export default App
