import * as types from './WeatherActionTypes'

export const reduceWeather = (state = {}, action) => {
    switch(action.type) {
        case types.WEATHER_SUCCESS:
            return {
                ...state,
                isDoneLoading: true,
                current: action.current,
                threeDay: action.threeDay,
                today: action.today
            }
        case types.WEATHER_ERROR:
            console.log(err)
            return {
                ...state,
                weatherErr: action.err
            }
        default: 
            return state  
    }
}