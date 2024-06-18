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

const t = new Trello()
console.log('t.parameters', t.parameters)
// const userData = await t.getUserData('all')
// console.log('trello user data:', userData)
const board = { id: '6671546fb65c8adb3129428a' }
// const boardData = await t.getBoard(board.id)
// console.log('board data:', boardData)
const lists = {}
// const boardLists = await t.getBoardLists(board.id)
const list = { id: '' }
// const listData = await t.getList(list.id)
// const card = {
//     name: 'test card',
//     idList: ''
// }
// let cardData = await t.postCard()


describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectValuesToMatch(w.base_url, 'http://api.weatherapi.com/v1')
    })

    describe('getData()',() => {

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






