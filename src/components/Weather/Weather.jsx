import React from 'react'
import style from './Weather.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as WeatherActions from './WeatherRedux/WeatherActions'


class WeatherContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        this.props.dispatch(WeatherActions.fetchWeather())
    }
    render () {
        return (
            
            <div >
                {
                this.props.isDoneLoading ? 
                <div > 
                    <div>{this.props.full}</div>
                    <div>{this.props.lowF}</div>
                    <div>{this.props.currentF}</div>
                    <div>{this.props.highF}</div>
                    <div>{this.props.humidity}</div>
                    <div>{this.props.condition}</div>
                    <div>{this.props.uv}</div>
                </div> : 
                <div >
                    <div>Loading...</div>
                </div> 
                }
                
                {
                this.props.isDoneLoading ? 
                this.props.threeDay.map(day => 
                    <div key={day.weekday}>
                        <div>{day.weekday}</div>
                        <div>{day.conditions}</div>
                        <div>{day.windSpeed}</div>
                        <div>{day.lowF}</div>
                        <div>{day.windDirection}</div>
                        <div>{day.highF}</div>
                        <div>{day.humidity}</div>
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
    if (!state.weather.isDoneLoading) return {isDoneLoading: false}
    return {
        isDoneLoading: state.weather.isDoneLoading,
        full: state.weather.current.display_location.full,
        lowF: `Low: ${state.weather.today.low.fahrenheit}F`,
        currentF: `${state.weather.current.temp_f}F`,
        highF: `High: ${state.weather.today.high.fahrenheit}F`,
        humidity: `Humidity: ${state.weather.current.relative_humidity}`,
        condition: state.weather.current.weather,
        uv: `UV Index: ${state.weather.current.UV}`,
        threeDay: state.weather.threeDay
    }
}
 
export default connect(mapStateToProps)(WeatherContainer)