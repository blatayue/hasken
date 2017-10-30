import React from 'react'
import { connect } from 'react-redux'
import * as actions from './RedditActions'
import style from './Reddit.scss'
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
            <div>
                {
                    this.props.posts.map(post => (
                        <div className={style.post}>

                            <p className={style.post__score}><i className='icon'>keyboard_icon_up</i>{post.score}</p>
                            
                            <a className={style.post__title} href={post.url}>
                                <h2>{post.title}</h2>
                            </a>
                            
                            <img className={style.post__thumbnail} height={post.thumbnail_height} src={post.thumbnail} />
                            
                            <a className={style.post__commentsLink} href={post.permalink}>
                                <p>{`${post.num_comments} Comments`}</p>
                            </a>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

Reddit.propTypes = {
    posts: PropTypes.arrayOf(
        shape({
            title: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnail_height: PropTypes.number,
            url: PropTypes.string,
            score: PropTypes.number.isRequired,
            num_comments: PropTypes.number.isRequired,
            permalink: PropTypes.string.isRequired, 
        })
    ).isRequired
}

export default connect(mapStateToProps)(Reddit)