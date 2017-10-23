import React from 'react'
import style from './Navbar.scss'
import Weather from './Weather'
export default () => (
        <nav>
            <div className={style.navWrap}>
                <a href="#" className='brand-logo'>Homepage</a>
                <ul>
                    <li><a href="#">Newsy Things</a></li>
                    <li><a href="#">Medium Articles</a></li>
                    <li><a href="#">Reddit</a></li>
                    <li><a href="#">Other Things</a></li>
                </ul>
                {<Weather />     }
            </div>
        </nav>
    )