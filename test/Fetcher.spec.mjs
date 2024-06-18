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
const userGetted = f.GET('/api/v1/users/0')

describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectStringToInclude('f.base_url', f.base_url, null, '.mockapi.io')
        expectObjectsAreEqual('parameters', f.parameters, 'empty object', {})
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






