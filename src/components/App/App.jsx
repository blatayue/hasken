import React from 'react'
import Navbar from '../Navbar/Navbar'
import Links from '../Links/Links'
import Reddit from '../Reddit/Reddit'
// import Medium from '../Medium/Medium'
export default class App extends React.Component {
    render () {
        return (
            <div>
                <Navbar />
                <Links />
                <Reddit />
            </div>
        )
    }
}