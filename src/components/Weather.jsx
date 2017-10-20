import React from 'react'
import createFetchWeather from '../weatherUtil'
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
        if (!this.state.weather) {
            const data = await fetchWeather()
            const today = new Date()
            this.setState({
                forecast: data.forecast.simpleforecast.forecastday,
                current: data.current_observation})
            }
        }
        weatherWidget = () => {
            if (this.state.weather) {
                const threeDay = this.state.forecast.splice(0, 1)
                return (
                    <div className={style.weatherDrops}>
                        {threeDay.map(day => 
                            <div className={style.forecasts}>
                                <div className={style.forecasts.day}>{threeDay.date.weekday}</div>
                                <div className={style.forecasts.condition}>{threeDay.conditions}</div>
                                <div className={style.forecasts.windS}>{'Average Wind: ' + threeDay.avewind.mph + 'mph'}</div>
                                <div className={style.forecasts.low}>{'Low: ' + threeDay.low.fahrenheit + 'F'}</div>
                                <div className={style.forecasts.windD}>{'Wind Direction: ' + threeDay.avewind.dir}</div>
                                <div className={style.forecasts.high}>{'High: ' + threeDay.high.fahrenheit + 'F'}</div>
                                <div className={style.forecasts.humidity}>{'Humidity: ' + threeDay.avehumidity + '%'}</div>
                            </div>
                        )}
                </div>
            )
        }
    }
    render() {
            return (
                this.state.current ? 
                    <div className={style.weatherCard}>
                        <div className={style.city}>{this.state.current.display_location.full}</div>
                        <div className={style.low}>{'Low: ' + this.state.forecast[0].low.fahrenheit + 'F'}</div>
                        <div className={style.now}>{this.state.current.temp_f + 'F'}</div>
                        <div className={style.high}>{'High: ' + this.state.forecast[0].high.fahrenheit + 'F'}</div>
                        <div className={style.humidity}>{'Humidity: ' + this.state.current.relative_humidity}</div>
                        <div className={style.condition}>{this.state.current.weather}</div>
                        <div className={style.UV}>{'UV index: ' + this.state.current.UV}</div>
                        {this.weatherWidget()}
                    </div> : null
        )
    }
}
export default Weather