import * as actions from './WeatherActions'
import * as types from './WeatherActionTypes'
import testData from './WeatherApi.fixture.json'
import chai from 'chai'
import chaiPromised from 'chai-as-promised'
chai.use(chaiPromised)
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'
import deepDiff from 'deep-diff'
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
describe('Weather Fetch Action Creator', () => {
    it('Should create WEATHER_SUCCESS on success', () => {
        fetchMock.getOnce(weatherApiUri,
        {body: testData})
        const store = mockStore({})
        const current = testData.current_observation
        const today = testData.forecast.simpleforecast.forecastday[0]
        const threeDay = testData.forecast.simpleforecast.forecastday
        .slice(1)
        .map(actions.forecastMap)

        const expectedAction = [
            {type: types.WEATHER_SUCCESS,
                today,
                threeDay,
                current
            }
        ]
        store.dispatch(actions.fetchWeather(weatherApiUri)).then(() => {
            const storeActions = store.getActions()
            expect(storeActions[0]).to.deep.equal(expectedAction[0])
        })
        
    })
})