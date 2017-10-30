import React from 'react'
import style from './App.scss'
import Navbar from '../Navbar/Navbar'
import Links from '../Links/Links'
import Reddit from '../Reddit/Reddit'
export default class App extends React.Component {
    render () {
        return (
            <div className={style.mainContainer}>
                <Navbar />
                <Links />
                <Reddit />
            </div>
        )
    }
}