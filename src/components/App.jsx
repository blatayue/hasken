import React from 'react'
import style from './App.scss'
import Navbar from './Navbar/Navbar'
export default class App extends React.Component {
    render() {
        return (
            <div className={style.mainContainer}>
                <Navbar/>
            </div>
        )
    }
}