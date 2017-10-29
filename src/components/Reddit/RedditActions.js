import * as types from './RedditActionTypes'
const redditWebDev = 'https://www.reddit.com/r/webdev.json'

export const getWebDevPosts = () => 
async (dispatch) => {
    const redditData = await (await fetch(redditWebDev)).json()
    return dispatch({
        type: types.REDDIT_SUCCESS,
        data: redditData
    })
}