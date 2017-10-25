import React from 'react'
import createFetchWeather from './weatherUtil'
import style from './Weather.scss'
const fetchWeather = createFetchWeather(async () =>
    await (await fetch('https://api.wunderground.com/api/1152f09242a61822/forecast/conditions/q/AZ/Glendale.json')).json()
);

class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    async componentDidMount() {
        if (!this.state.forecast) {
            const data = await fetchWeather()
            this.setState({
                forecast: data.forecast.simpleforecast.forecastday,
                threeDay: data.forecast.simpleforecast.forecastday.slice(1),
                current: data.current_observation
            })
        }
    }
    render() {
        return (
            this.state.current ?
                <div className={style.weather}>
                    <div className={style.weatherNow}>
                        <div className={style.weatherNow__city}>{this.state.current.display_location.full}</div>
                        <div className={style.weatherNow__low}>{'Low: ' + this.state.forecast[0].low.fahrenheit + 'F'}</div>
                        <div className={style.weatherNow__tempNow}>{this.state.current.temp_f + 'F'}</div>
                        <div className={style.weatherNow__high}>{'High: ' + this.state.forecast[0].high.fahrenheit + 'F'}</div>
                        <div className={style.weatherNow__humidity}>{'Humidity: ' + this.state.current.relative_humidity}</div>
                        <div className={style.weatherNow__condition}>{this.state.current.weather}</div>
                        <div className={style.weatherNow__uvIndex}>{'UV index: ' + this.state.current.UV}</div>
                    </div>
                    {
                        this.state.forecast &&
                        this.state.threeDay.map(day => 
                            <div className={style.forecast} key={day.date.weekday}>
                                <div className={style.forecast__day}>{day.date.weekday}</div>
                                <div className={style.forecast__condition}>{day.conditions}</div>
                                <div className={style.forecast__windSpeed}>{'Average Wind: ' + day.avewind.mph + 'mph'}</div>
                                <div className={style.forecast__low}>{'Low: ' + day.low.fahrenheit + 'F'}</div>
                                <div className={style.forecast__windDirection}>{'Wind Direction: ' + day.avewind.dir}</div>
                                <div className={style.forecast__high}>{'High: ' + day.high.fahrenheit + 'F'}</div>
                                <div className={style.forecast__humidity}>{'Humidity: ' + day.avehumidity + '%'}</div>
                            </div>
                        )
                    }
                </div> :
                null
        )
    }
}
export default Weather