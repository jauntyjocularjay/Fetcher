import {
    expectToBeTrue,
    expectValuesToMatch,
    expectValuesToEqual,
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
import { Fetcher } from '../Fetcher.mjs'



const url = 'https://localhost:3000/users'
const f = new Fetcher(url)

async function POSTtests(){

    const userList = await f.POST()
    console.log('userList', userList)

    describe('POST Fetches', () => {
        expect(userList.length).to.eql(3)
    })
}


await POSTtests()
