import * as types from './RedditActionTypes'
const redditWebDev = 'https://www.reddit.com/r/webdev/hot.json?limit=10'

export const getWebDevPosts = () => 
async (dispatch) => {
    const redditData = await (await fetch(redditWebDev)).json()
    const posts = redditData.data.children.map(mapPosts)

    return dispatch({
        type: types.REDDIT_SUCCESS,
        data: posts
    })
}

export const mapPosts = post => {
    return {
        title: post.title,
        thumbnail: post.thumbnail,
        thumbnail_height: post.thumbnail_height,
        stickied: post.stickied,
        url: post.url,
        score: post.score,
        num_comments: post.num_comments,
    }

}