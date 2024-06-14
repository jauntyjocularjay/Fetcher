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



class OddsFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.the-odds-api.com'
        this.APIsuffix = `?apiKey=${ENV.oddsAPI.key}`
    }
    async getSports(){
        const endpoint = '/v4/sports/'+ this.APIsuffix
        console.log('getSports endpoint:', endpoint)
        return await this.getData(endpoint)
    }

}

const F = new Fetcher()
const OF = new OddsFetcher()

// let getData = await F.getData(OF.base_url+'/v4/sports?apiKey=a02f6b953b2fa416ff74ca39162af006')
// let getSports = await OF.getSports()

describe('OddsFetcher', () => {
    describe('getSports', () => {
        it('should be an object', () => {
        })
    })
})

class TrelloFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.trello.com'
        this.APIKey = ENV.trelloAPI.key
        this.APIToken = ENV.trelloAPI.token
        this.suffix = `&key=${this.APIKey}&token=${this.APIToken}`
    }

    async getUserData(fields){
        fields = `fields=${fields}`
        const endpoint = `/1/members/me/boards?${fields}&${this.suffix}`
        //                /1/members/me/boards?fields=name,url&key={apiKey}&token={apiToken}
        return await this.getData(endpoint)
    }

    async getBoard(boardID){
        const endpoint = `/1/boards/${boardID}?${this.suffix}`
        //                /1/boards/{id}?key=APIKey&token=APIToken
        return await this.getData(endpoint)
    }

    async createBoard(workspace, boardName){
        boardName = `name=${boardName.toLowerCase()}`
        workspace = `&idOrganization=${workspace.toLowerCase()}`
        const endpoint = `/1/boards/?${boardName}${workspace}${this.suffix}`
        return await this.postData(endpoint, null)
    }

    async updateBoard(boardID, parameters){
        const endpoint = `1/boards/{id}?${parameters}${this.suffix}`
        return await this.putData(endpoint, null)
    }

    async deleteBoard(boardID){
        boardID = `${boardID.toLowerCase()}`
        const endpoint = `/1/boards/${boardID}?${this.suffix}`
        return await this.deleteData(endpoint, null)
    }
}

const t = new TrelloFetcher()
// let createBoard = await t.createBoard('zappplugin', 'plugin')
// console.log('createBoard:', createBoard)
// let createBoardStatus = createBoard.status
// let getUserData = await t.getUserData('name,url')
// console.log('getUserData:', getUserData)
// let userDataStatus = getUserData.status
// let getBoardStatus = await t.getBoard('666bfda069fd54b1d65b3834')
// console.log('getBoardStatus:', getBoardStatus)
// let boardStatus = getBoardStatus.status
let setRedLabelName = await t.updateBoard('666c07348ba8a40ac70640c9', 'labelNames/red=review')
console.log('setRedLabelName:', setRedLabelName)
let setRedLabelNameStatus = setRedLabelName.status
// let deleteBoard = await t.deleteBoard('666c06959ba25fdab848a715')
// let deleteBoardStatus = deleteBoard.status
// console.log('deleteBoard:', deleteBoard)


describe('TrelloFetcher', () => {
    // expectValuesToMatch(createBoardStatus, 200)
    expectValuesToMatch(userDataStatus, 200)
    // expectValuesToMatch(boardStatus, 200)
    // expectValuesToMatch(deleteBoardStatus, 200)
})






