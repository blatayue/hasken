import * as actions from './WeatherActions'
import * as types from './WeatherActionTypes'
import testData from './WeatherApi.fixture.json'
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
const weatherApiUri = 'https://api.wunderground.com/api/1152f09242a61822/forecast/conditions/q/AZ/Glendale.json'
describe('async fetches', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
})
describe('Weather API thunk', () => {
    it('Should dispatch WEATHER_SUCCESS on fetch success with right weather keys', 
    (done) => {
        fetchMock.getOnce(weatherApiUri,
        {body: testData})
        const store = mockStore({})

        const expectedActionsKeys = [
            [
                'type',
                'today',
                'threeDay',
                'current'
            ]
        ]
        store.dispatch(actions.fetchWeather()).then(() => {
            const storeActions = store.getActions()
            storeActions.map((action, i) => {
                action.should.have.keys(expectedActionsKeys[i])
                done()
            })
        })
        
    })
})