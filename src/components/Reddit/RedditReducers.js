import * as types from './RedditActionTypes'
export const redditReducer = (state = {}, action) => {
    switch(action.type) {
        case types.REDDIT_SUCCESS:
            return {
                ...state,
                redditData: action.data
            }
    }
} 