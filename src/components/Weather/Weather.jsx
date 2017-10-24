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
            const today = new Date()
            this.setState({
                forecast: data.forecast.simpleforecast.forecastday,
                current: data.current_observation
            })
        }
    }
    weatherWidget = () => {
        if (this.state.forecast) {
            // console.log(this.state.forecast)
            const threeDay = this.state.forecast.slice(1)
            console.log(threeDay)
            return (
                threeDay.map(day => 
                    <div className={style.drops} key={day.date.weekday}>
                        <div className={style.day}>{day.date.weekday}</div>
                        <div className={style.condition}>{day.conditions}</div>
                        <div className={style.windS}>{'Average Wind: ' + day.avewind.mph + 'mph'}</div>
                        <div className={style.low}>{'Low: ' + day.low.fahrenheit + 'F'}</div>
                        <div className={style.windD}>{'Wind Direction: ' + day.avewind.dir}</div>
                        <div className={style.high}>{'High: ' + day.high.fahrenheit + 'F'}</div>
                        <div className={style.humidity}>{'Humidity: ' + day.avehumidity + '%'}</div>
                    </div>
                )
            )
        }
    }
    render() {
            return (
                this.state.current ?
                    <div className={style.weatherCard}>
                        <div className={style.currentWeather}>
                            <div className={style.city}>{this.state.current.display_location.full}</div>
                            <div className={style.low}>{'Low: ' + this.state.forecast[0].low.fahrenheit + 'F'}</div>
                            <div className={style.now}>{this.state.current.temp_f + 'F'}</div>
                            <div className={style.high}>{'High: ' + this.state.forecast[0].high.fahrenheit + 'F'}</div>
                            <div className={style.humidity}>{'Humidity: ' + this.state.current.relative_humidity}</div>
                            <div className={style.condition}>{this.state.current.weather}</div>
                            <div className={style.UV}>{'UV index: ' + this.state.current.UV}</div>
                        </div>
                        <div className={style.dropsContainer}>
                            {this.weatherWidget()}
                        </div>
                    </div> : 
                    null
        )
    }
}
export default Weather