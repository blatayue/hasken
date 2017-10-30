import * as actions from './RedditActions'
import * as types from './RedditActionTypes'
import testData from './RedditWebDev.fixture.json'
import chai from 'chai'
import chaiPromised from 'chai-as-promised'
chai.use(chaiPromised)
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const expect = chai.expect
const should = chai.should()
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const redditUri = 'https://www.reddit.com/r/webdev/hot.json?limit=10'
describe('async fetches', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
})
describe('Reddit thunk', () => {
    it('Should fetch reddit /r/webdev json, map the posts, dispatch REDDIT_SUCCESS', () => {
        fetchMock.getOnce(redditUri, {body: testData})
        const store = mockStore({})
        const posts = testData.data.children.map(actions.mapPosts)
        const expectedActions = [
            {
                type: types.REDDIT_SUCCESS,
                data: posts,
                sub: 'webdev'
            },
        ]
        store.dispatch(actions.getWebDevPosts()).then(() => {
            const storeActions = store.getActions()
            storeActions.map((action, i) => {
                action.should.deep.equal(expectedActions[i])
            })
        })
    })
})