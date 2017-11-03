import React from 'react'
import style from './Links.scss'
import Lazyload from 'react-lazyload'
const Links = () => (
    <div className={style.link}>
        <a href="https://reddit.com" className={style.link__reddit}>
            <Lazyload>
                <img src={require('images/snoo.png')} height='20px'/>
            </Lazyload>
            <p>Reddit</p>
        </a>
        <a href="https://medium.com" className={style.link__medium}>
            <Lazyload>
                <img src={require('images/medium.png')} height='20px'/>
            </Lazyload>
            <p>Medium</p>
        </a>
        <a href="https://youtube.com" className={style.link__youtube}>
            <Lazyload>
                <img src={require('images/play.png')} height='20px'/>
            </Lazyload>
            <p>YouTube</p>
        </a>
    </div>
)

export default Links