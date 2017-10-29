import React from 'react'
import style from './Weather.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as WeatherActions from './WeatherActions'
const weatherApiUri = 'https://api.wunderground.com/api/1152f09242a61822/forecast/conditions/q/AZ/Glendale.json'

class WeatherContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        this.props.dispatch(WeatherActions.fetchWeather(weatherApiUri))
    }
    render () {
        return (
            
            <div className={style.weather}>
                {
                this.props.isDoneLoading ? 
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
                this.props.isDoneLoading ? 
                this.props.threeDay.map(day => 
                    <div className={style.forecast} key={day.weekday}>
                        <div className={style.forecast__day}>{day.weekday}</div>
                        <div className={style.forecast__condition}>{day.conditions}</div>
                        <div className={style.forecast__windSpeed}>{day.windSpeed}</div>
                        <div className={style.forecast__low}>{day.lowF}</div>
                        <div className={style.forecast__windDirection}>{day.windDirection}</div>
                        <div className={style.forecast__high}>{day.highF}</div>
                        <div className={style.forecast__humidity}>{day.humidity}</div>
                    </div>
                ) : null}
            </div>
        )
    }
}

WeatherContainer.propTypes = {
    isDoneLoading: PropTypes.bool.isRequired,
    full: PropTypes.string,
    lowF: PropTypes.string,
    current: PropTypes.string,
    highF: PropTypes.string,
    humidity: PropTypes.string,
    uv: PropTypes.string,
    threeDay: PropTypes.array
}
const mapStateToProps = state => {
    if (!state.isDoneLoading) return {isDoneLoading: false}
    return {
        isDoneLoading: state.isDoneLoading,
        full: state.current.display_location.full,
        lowF: `Low: ${state.today.low.fahrenheit}F`,
        currentF: `${state.current.temp_f}F`,
        highF: `High: ${state.today.high.fahrenheit}F`,
        humidity: `Humidity: ${state.current.relative_humidity}`,
        condition: state.current.weather,
        uv: `UV Index: ${state.current.UV}`,
        threeDay: state.threeDay
    }
}
 
export default connect(mapStateToProps)(WeatherContainer)