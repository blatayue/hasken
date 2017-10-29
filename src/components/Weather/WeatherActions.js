import * as types from './WeatherActionTypes'

export const fetchWeather = weatherApiUri => 
    async (dispatch) => {
        try {
            const data = await (await fetch(weatherApiUri)).json()
            const current = data.current_observation
            const today = data.forecast.simpleforecast.forecastday[0]
            const threeDay = data.forecast.simpleforecast.forecastday
            .slice(1)
            .map(forecastMap)
            return dispatch({
                type: types.WEATHER_SUCCESS, 
                current, 
                today, 
                threeDay
            })            
        } catch (err) {
            console.log(err)
            return dispatch({type: types.WEATHER_ERROR, err})
        }
    }
export const forecastMap = (day) => {
    return {
        weekday: day.date.weekday,
        condition: day.conditions,
        windSpeed: `Average Wind: ${day.avewind.mph}mph`,
        lowF: `Low: ${day.low.fahrenheit}F`,
        windDirection: `Wind Direction: ${day.avewind.dir}`,
        highF: `High: ${day.high.fahrenheit}F`,
        humidity: `Humidity: ${day.avehumidity}%`   
    }
}