import React from 'react'
import LazyLoad from 'react-lazyload'
const Posts = props => (
    props.posts.map(post =>
        <div key={post.title}>

            <i className="material-icons md-dark">keyboard_arrow_up</i>
            <p>{post.score}</p>
            
            <a href={post.url}s>
                <h2>{post.title}</h2>
            </a>
            <a href={post.url}>
                <LazyLoad height='4rem'>
                    <img href={post.url} 
                        height='4rem' 
                        src={
                        post.thumbnail === 'self' ? 
                        require('images/self.png') :
                        post.thumbnail === 'default' ?
                        require('images/globe.png') :
                        post.thumbnail
                    } 
                    />
                </ LazyLoad>
            </a>
            <div>
                <p>{post.author}</p>
                      
                <p>
                    <a href={post.permalink}>{`${post.num_comments} Comments`}</a>
                </p>
            </div>
        </div>
    )
)

export default Posts