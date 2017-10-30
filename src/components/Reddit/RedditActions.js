import * as types from './RedditActionTypes'
const redditWebDev = 'https://www.reddit.com/r/webdev/hot.json?limit=10'

export const getWebDevPosts = () => 
async (dispatch) => {
    const redditData = await (await fetch(redditWebDev)).json()
    const posts = redditData.data.children.map(mapPosts)

    return dispatch({
        type: types.REDDIT_SUCCESS,
        data: posts,
        sub: 'webdev'
    })
}

export const mapPosts = post => ({
        title: post.data.title,
        thumbnail: post.data.thumbnail,
        thumbnail_height: post.data.thumbnail_height,
        stickied: post.data.stickied,
        url: post.data.url,
        score: post.data.score,
        num_comments: post.data.num_comments,
        permalink: `https://www.reddit.com${post.data.permalink}`,
})