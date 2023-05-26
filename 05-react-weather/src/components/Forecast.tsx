import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { ICurrentWeather } from '../types'
import dayBanner from '../assets/images/day.svg'
import nightBanner from '../assets/images/night.svg'


interface IProps {
	weather: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({ weather }) => {
	const now = Math.round(Date.now() / 1000) // /1000 för att gå från ms till sekunder, och sen avrundar till närmsta heltal med .round()
	const banner = now > weather.sys.sunrise && now < weather.sys.sunset
		? dayBanner
		: nightBanner

	return (

		<div id="forecast">
			<div className="card">


				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{weather.name}</span>,
						<span id="country">{weather.sys!.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{weather.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{weather.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{weather.wind.speed}</span> m/s {weather.wind.deg}&deg;
					</p>


					<ul className="conditions">
						{weather.weather.map(condition => (
							<li key={condition.id}>
								<img
									src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`}
									title={condition.main}
									alt={condition.description}
								/>
								{condition.description}
							</li>

						))}
					</ul>

					<p className="text-muted small">
						<span>
							{new Date(weather.dt * 1000).toLocaleString()}
						</span>
					</p>

				</div>

			</div>
		</div>

	)

}

export default Forecast
