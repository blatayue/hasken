import React from 'react'
import { connect } from 'react-redux'
import * as actions from './RedditRedux/RedditActions'
import Posts from './Posts/Posts'
import PropTypes from 'prop-types'
class Reddit extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.dispatch(actions.getWebDevPosts())
    }
    render() {
        return (
            this.props.isDoneLoading ?             
            <div /* where to style props*/>
                <Posts posts={this.props.posts} />
            </div> : null
        )
    }
}

const mapStateToProps = state => {
    if(!state.reddit.isDoneLoading) return {isDoneLoading: false}
    return {
        posts: state.reddit.redditPosts,
        isDoneLoading: true
    }
}

Reddit.propTypes = {
    isDoneLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnail_height: PropTypes.number,
            url: PropTypes.string,
            score: PropTypes.number.isRequired,
            num_comments: PropTypes.number.isRequired,
            permalink: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            stickied: PropTypes.bool
        })
    )
}

export default connect(mapStateToProps)(Reddit)