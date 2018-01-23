import React from 'react'
import Lazyload from 'react-lazyload'
const Links = () => (
    <div className={style.link}>
        <a href="https://medium.com">
            <Lazyload>
                <img src={require('images/medium.png')} height='20px'/>
            </Lazyload>
            <p>Medium</p>
        </a>
        <a href="https://reddit.com">
            <Lazyload>
                <img src={require('images/snoo.png')} height='20px'/>
            </Lazyload>
            <p>Reddit</p>
        </a>
        <a href="https://youtube.com">
            <Lazyload>
                <img src={require('images/play.png')} height='20px'/>
            </Lazyload>
            <p>YouTube</p>
        </a>
    </div>
)

export default Links