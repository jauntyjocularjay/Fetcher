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
import { ENV } from '../secret.mjs'
import { Fetcher } from '../Fetcher.mjs'



const f = new Fetcher(`https://${ENV.fetcherMock.token}.mockapi.io`)
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

function constructorTests(){

    describe('Fetcher constructor testing', () => {
        expectStringToInclude('f.base_url', f.base_url, 'https://', 'https://')
        expectStringToInclude('f.base_url', f.base_url, 'mockapi.io', 'mockapi.io')
    })
}

async function getTests(){
    const task1Subject = await f.GET(task_endpoint.task.replace(':task_id',1))
    const task1Target = {
        "completed": false,
        "title": "title 1",
        "id": "1"
    }

    describe('Fetcher.GET testing', () => {
        expectValuesToEqual('subject completed', task1Subject.completed, 'target completed', task1Target.completed)
        expectValuesToEqual('subject title', task1Subject.title, 'target title', task1Target.title)
        expectValuesToEqual('subject id', task1Subject.id, 'target id', task1Target.id)
    })
}

async function deleteTests(){
    const merchStart = await f.GET(merch_endpoint.item.replace(':item_id', ''))
    console.log('merch start:', merchStart)
    await f.DELETE(merch_endpoint.item.replace(':item_id', merchStart.length-1))
    const merchAfter = await f.GET(merch_endpoint.item.replace(':item_id', ''))

    describe('Fetcher.DELETE testing', () => {
        expectValuesToEqual('Length at the start: '+merchStart.length, merchStart.length, 'length at the end: '+merchAfter.length, merchAfter.length)
    })
}

async function postTests(){
    const itemToAdd = {
        "price": "3.14",
        "name": "Strawberry Rhubarb Pi",
        "id": "1"
    }

    console.log(`merch_endpoint.item.replace(':item_id','')`, merch_endpoint.item.replace(':item_id',''))
    const postResult = await f.POST(merch_endpoint.item.replace(':item_id', ''), {body: itemToAdd})
    console.log('postResult', postResult)
    const allItems = await f.GET(merch_endpoint.item.replace(':item_id',''))
    console.log('allItems:', allItems)
    const lastElement = allItems[allItems.length-1]
    describe('Fetcher.POST testing', () => {
        expectValuesToEqual('subject price', lastElement.price, 'item added price', itemToAdd.price)
    })

}


constructorTests()
await getTests()
await deleteTests()
await postTests()

