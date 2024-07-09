import {
    ENV
} from '../secret.mjs'
import {
    Fetcher,
    Method,
    Headers,
    Options
} from '../Fetcher.ts'
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
    expectArraysToBeEqual,
    expectValuesToEqual,
    expectArrayToInclude,
    expectArraytoIncludeArrayContents,
    objectsAreEquivalent,
    expectStringToInclude,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError,
    nullCheck
} from '../module/chaitests/Chai.mjs'



const f = new Fetcher(`https://${ENV.mockio.token}.mockapi.io`, {})
const merch_endpoint = {
    item: '/api/v1/merch/:item_id',
    id: '/api/v1/merch/:item_id/id/:new_value',
    uri: '/api/v1/merch/:item_id/image/:image_uri',
    name: '/api/v1/merch/:item_id/name/:item_name'
}
const task_endpoint = {
    all_tasks: '/api/v1/tasks',
    task: '/api/v1/tasks/:task_id'
}

function ConstructorTests(){
    expectStringToInclude('base_url', f.base_url, 'https://MOCKIO_TOKEN.mockapi.io')

}


describe('Fetcher.ts', () => {

    ConstructorTests()

})
