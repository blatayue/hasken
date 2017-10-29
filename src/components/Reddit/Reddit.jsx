import React from 'react'
import { connect } from 'react-redux'
class Reddit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Reddit)