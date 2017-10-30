import React from 'react'
import style from './Posts.scss'
import LazyLoad from 'react-lazyload'
const Posts = props => (
    props.posts.map(post =>
        <div className={style.post} key={post.title}>

            <p className={style.post__score}>{post.score}</p>
            
            <a href={post.url} 
                className={post.stickied ? 
                style['post__title--stickied'] : 
                style.post__title}
            >
                <h2>{post.title}</h2>
            </a>
            <a href={post.url} className={style.post__thumbLink}>
                <LazyLoad height='4rem'>
                    <img href={post.url} className={style.post__thumbnail} 
                        height='4rem' 
                        src={post.thumbnail !== 'self' ? 
                        post.thumbnail : 
                        require('../../../images/self.png')} 
                    />
                </ LazyLoad>
            </a>
            <div className={style.post__flex}>
                <p className={style.post__author}>{post.author}</p>
                      
                <p className={style.post__commentsLink}>
                    <a href={post.permalink}>{`${post.num_comments} Comments`}</a>
                </p>
            </div>
        </div>
    )
)

export default Posts