import React from 'react'
import { connect } from 'react-redux'
import * as actions from './RedditActions'
import style from './Reddit.scss'
class Reddit extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.dispacth(actions.getWebDevPosts())
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Reddit)