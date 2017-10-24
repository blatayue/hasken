import React from 'react'
import style from './Navbar.scss'
import Weather from '../Weather/Weather'
export default () => (
        <nav>
            <div className={style.navWrap}>
                <a href="#" className='brand-logo'>Homepage</a>
                <Weather />
            </div>
        </nav>
    )