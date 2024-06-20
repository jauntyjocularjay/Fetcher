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
    user: '/api/v1/users/:user_id'
}

const user1 = await f.GET(endpoint.user.replace(':user_id','1'))
const user1Target = {
    "createdAt": "2024-06-18T02:45:47.067Z",
    "name": "Floyd Howell MD",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1207.jpg",
    "id": "1"
}


const user18Target = {
    "createdAt": "2024",
    "name": "Floyd",
    "avatar": "1207.jpg",
    "id": "18"
}
const user18endpoint = endpoint.user.replace(':user_id', user18Target.id)
let user18 = await f.PUT(user18endpoint, {body: user18Target})
user18 = await f.GET(user18endpoint)
console.log('user18', user18, '\n', 'user18Target', user18Target)



describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectStringToInclude('f.base_url', f.base_url, null, '.mockapi.io')
        expectObjectsAreEqual('parameters', f.parameters, 'empty object', {})
    })

    describe('getData()',() => {
        expectObjectsAreEqual('user1', user1, 'user1 reference', user1Target)
    })

    describe('putData()', () => {
        expectObjectsAreEqual('user18', user18, 'user18Target', user18Target)
    })

    describe('patchData()', () => {

    })

    describe('postData()', () => {

    })

    describe('deleteData()', () => {

    })
})






