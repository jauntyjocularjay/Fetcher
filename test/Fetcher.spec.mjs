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
let getSports = await OF.getSports()

describe('OddsFetcher', () => {
    describe('getSports', () => {
        it('should be an object', () => {
            expect(getSports).to.be.an('array')
        })
    })
})











