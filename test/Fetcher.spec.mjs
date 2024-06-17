import {
    throwsAnError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    expectToBeTrue,
    expectValuesToMatch,
    objectsAreEquivalent,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError,
    nullCheck,
} from '../module/chaitests/Chai.mjs'
import { 
    expect,
    should
} from 'chai'
import { ENV } from '../secret.mjs'
import { Fetcher } from '../Fetcher.mjs'
import { WeatherFetcher as Weather } from '../components/WeatherAPI.mjs'
import { TrelloFetcher as Trello } from '../components/Trello.mjs'



const w = new Weather()
let scottsdale = await w.getHistory('scottsdale,us', '2024-06-17')

describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectValuesToMatch(w.base_url, 'http://api.weatherapi.com/v1')
    })

    describe('getData()',() => {
        expect(typeof scottsdale.location).to.equal('object')
    })

    describe('putData()', () => {

    })

    describe('patchData()', () => {

    })

    describe('postData()', () => {

    })

    describe('deleteData()', () => {

    })
})






