import React from 'react'
import { connect } from 'react-redux'
import { fetchWeather, mapStateToWeather } from './WeatherRedux'
import Forecast from './Forecast/Forecast';
import style from './Weather.scss'
const weatherApiUri = 'https://api.wunderground.com/api/1152f09242a61822/forecast/conditions/q/AZ/Glendale.json'

class WeatherContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        console.log('fired')
        this.props.dispatch(fetchWeather(weatherApiUri))
    }
    render () {
        return (
            
            <div className={style.weather}>
                {this.props.full ? 
                <div className={style.weatherNow}> 
                    <div className={style.weatherNow__city}>{this.props.full}</div>
                    <div className={style.weatherNow__low}>{this.props.lowF}</div>
                    <div className={style.weatherNow__tempNow}>{this.props.currentF}</div>
                    <div className={style.weatherNow__high}>{this.props.highF}</div>
                    <div className={style.weatherNow__humidity}>{this.props.humidity}</div>
                    <div className={style.weatherNow__condition}>{this.props.condition}</div>
                    <div className={style.weatherNow__uvIndex}>{this.props.uv}</div>
                </div> : 
                <div className={style.weatherNow}>
                    <div className={style.weatherNow__city}>Loading...</div>
                </div> 
                }
                
                {
                this.props.threeDay ? 
                this.props.threeDay.map(day => 
                    <Forecast 
                     key={day.weekday}
                     weekDay={day.weekday}
                     condition={day.condition}
                     windSpeed={day.windSpeed}
                     windDirection={day.windDirection}
                     lowF={day.lowF}
                     highF={day.highF}
                     humidity={day.humidity}
                     />
                ) : null}
            </div>
        )
    }
}
export default connect(mapStateToWeather)(WeatherContainer)