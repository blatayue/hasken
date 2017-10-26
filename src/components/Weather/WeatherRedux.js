

//types
const WEATHER_SUCCESS = 'WEATHER_SUCCESS'

export const fetchWeather = fetcher => 
    async (dispatch) => {
        try {
            const data = await fetcher()
            const current = data.current_observation
            const threeDay = data.forecast.simpleforecast.forecastday
            .slice(1)
            .map(forecastMap)
            dispatch({
                type: WEATHER_SUCCESS,
                current,
                threeDay,
                today: data.forecast.simpleforecast.forecastday[0]
            })

        } catch (err) {
            return err
        }
    }

    
export const reduceWeather = (state = {}, action) => {
    switch(action.type) {
        case WEATHER_SUCCESS:
            return {
                ...state,
                current: action.current,
                threeDay: action.threeDay,
                today: action.today
            }
        default: 
            return state  
    }
}

const forecastMap = (day) => {
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

export const mapStateToWeather = state => {
    if (!state.current) return {}
    return {
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