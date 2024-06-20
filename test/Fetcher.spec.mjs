import {
    expectToBeTrue,
    expectValuesToMatch,
    expectArraysToBeEqual,
    expectArrayToInclude,
    expectArraytoIncludeArrayContents,
    objectsAreEquivalent,
    expectStringToInclude,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError
} from '../module/chaitests/Chai.mjs'
import { 
    expect,
    should
} from 'chai'
import { ENV } from '../secret.mjs'
import { Fetcher } from '../Fetcher.mjs'



const f = new Fetcher(`https://${ENV.fetcherMock.token}.mockapi.io`)
const endpoint = {
    user: '/api/v1/users/:user_id',
    id: ':user_id/id/:new_value'
}

const user1 = await f.GET(endpoint.user.replace(':user_id','1'))
const user1Target = {
    "createdAt": "2024-06-18T02:45:47.067Z",
    "name": "Floyd Howell MD",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1207.jpg",
    "id": "1"
}


const user19Target = {
    "createdAt": "2024",
    "name": "Mista Nineteen",
    "avatar": "1207.jpg",
    "id": "19"
}
const user19endpoint = endpoint.user.replace(':user_id', '')

await f.POST(user19endpoint, {body: user19Target})
let user19 = await f.GET(user19endpoint)
console.log(`
    user19endpoint: ${user19endpoint},
    user19Target: ${user19Target},
    user19: ${user19}`)

describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectStringToInclude('f.base_url', f.base_url, null, '.mockapi.io')
        expectObjectsAreEqual('parameters', f.parameters, 'empty object', {})
    })

    describe('getData()',() => {
        expectObjectsAreEqual('user1', user1, 'user1 reference', user1Target)
    })

    describe('putData()', () => {
        
    })

    describe('patchData()', () => {

    })

    describe('postData()', () => {
        expectObjectsAreEqual('user19', user19, 'user19Target', user19Target)
    })

    describe('deleteData()', () => {

    })
})






