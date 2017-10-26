import React from 'react'
import style from './Forecast.scss'

const Forecast = (props) => 
        <div className={style.forecast}>
            <div className={style.forecast__day}>{props.weekday}</div>
            <div className={style.forecast__condition}>{props.conditions}</div>
            <div className={style.forecast__windSpeed}>{props.windSpeed}</div>
            <div className={style.forecast__low}>{props.lowF}</div>
            <div className={style.forecast__windDirection}>{props.windDirection}</div>
            <div className={style.forecast__high}>{props.highF}</div>
            <div className={style.forecast__humidity}>{props.humidity}</div>
        </div>
export default Forecast