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
    it('Should dispatch REDDIT_SUCCESS on fetch reddit success with the right keys', 
    (done) => {
        fetchMock.getOnce(redditUri, {body: testData})
        const store = mockStore({})
        const expectedActionsKeys = [
            [
                'type',
                'data'
            ],
        ]
        store.dispatch(actions.getWebDevPosts()).then(() => {
            const storeActions = store.getActions()
            storeActions.forEach((action, i) => {
                action.should.have.keys(expectedActionsKeys[i])
            })
            done()
        })
    })
})