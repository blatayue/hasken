import React from 'react'
import style from './App.scss'
import Navbar from '../Navbar/Navbar'
import Links from '../Links/Links'
import Reddit from '../Reddit/Reddit'
// import Medium from '../Medium/Medium'
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