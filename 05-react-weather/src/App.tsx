import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)
	const [searching, setSearching] = useState(false)
	const [error, setError] = useState<string | boolean>(false) //vilken type ska detta vara?? --- johan svarade dessa i WS genomgången. jag hade <any>(undefined) förut

	const getWeather = async (city: string) => {
		setSearching(true)
		setError(false)

		try {
			// call API and ask for weather in `location`
			const data = await getCurrentWeather(city)
			console.log(data)

			// update `currentWeather`-state with the current weather
			setCurrentWeather(data)

		} catch (error: any) {
			setError(error.message)
		}
		setSearching(false)
	}

	return (
		<>
			{
				(
					<div id="app" className="container">
						<SearchCity
							onSearch={getWeather}
						/>

						{error
							?
							(
								<div className='d-flex justify-content-center'>
									<div className='container m-3 text-center alert alert-warning'>
										<p>An error occurred:</p>
										<p>{error}</p>
									</div>
								</div>
							)
							:
							(
								searching
									?
									(<img
										className="container-fluid"
										src={Airplane}
										alt="Loading-spinner showing an airplane flying among clouds" />
									)
									:
									(
										currentWeather && <Forecast
											weather={currentWeather}
										/>
									)
							)
						}
					</div>
				)
			}
		</>
	)
}

export default App
