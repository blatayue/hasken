import React from 'react'
import style from './App.scss'
import Navbar from './Navbar'
import Weather from './Weather'
export default class App extends React.Component {
    render() {
        return (
            <div className={style.mainContainer}>
                <Navbar/>
                {/* <div className={style.cardThing}>
                    <div className={style.stuffs}>
                        <span className={style.title}>Hello</span>
                        <p>Hi, it's a card lol</p>
                    </div>
                </div> */}
                <Weather/>
            </div>
        )
    }
}