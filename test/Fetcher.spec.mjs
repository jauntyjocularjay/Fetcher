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
import {
    Fetcher,
    SchemaType
} from '../Fetcher.mjs'



const f = new Fetcher(`https://${ENV.mockio.token}.mockapi.io`)
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
const types = [
    { type: 'array' },
    { type: 'bigint' },
    { type: 'boolean' },
    { type: 'object' },
    { type: 'number' },
    { type: 'integer' },
    { type: 'decimal' },
    { type: 'string' },
    { type: 'symbol' },
    { type: 'null' }
]
const failvalue = {type: "unicorn"}
const schemaType = new SchemaType()

function schemaTypeTests(){
    describe('SchemaType.matches() value verification and is failable', () => {
        types.forEach(type => {
            expectToBeTrue(`SchemaType.matches({type: '${type.type}'})`, SchemaType.matches(type))
        })

        expectToBeTrue(`SchemaType.matches({type: '${failvalue.type}'})`, SchemaType.matches(failvalue), false)
    })

    describe('Type string is SchemaType', () => {
        expectStringToInclude('SchemaType', null, schemaType.typeOf(), null)
    })
}

function constructorTests(){

    describe('Fetcher constructor testing', () => {
        expectStringToInclude('f.base_url', f.base_url, 'https://', 'https://')
        expectStringToInclude('f.base_url', f.base_url, '.mockapi.io', '.mockapi.io')
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

async function putTests(){

    const itemID48 = merch_endpoint.item.replace(':item_id',48)
    let updatedItem = await f.GET(itemID48)
    const newPrice = '4.80'
    updatedItem.price = newPrice
    await f.PUT(itemID48, {body: updatedItem})
    updatedItem = await f.GET(itemID48)

    describe('Fetcher.PUT testing', () => {
        expectValuesToEqual('subject price', updatedItem.price, 'item51priceUpdate price', newPrice)
    })
}

async function patchTests(){

    let updatedItem = await f.GET(merch_endpoint.item.replace(':item_id',30))
    const newPrice = '3.00'
    updatedItem.price = newPrice
    await f.PATCH(merch_endpoint.item.replace(':item_id',30), {body: updatedItem})
    updatedItem = await f.GET(merch_endpoint.item.replace(':item_id',30))

    describe('Fetcher.PATCH testing', () => {
        expectValuesToEqual('subject price', updatedItem.price, 'newPrice', newPrice)
    })
}

async function postTests(){
    const itemToAdd = {
        "price": "3.14",
        "name": "Strawberry Rhubarb Pi",
        "id": "1"
    }

    await f.POST(merch_endpoint.item.replace(':item_id', ''), {body: itemToAdd})
    const allItems = await f.GET(merch_endpoint.item.replace(':item_id',''))
    const lastElement = allItems[allItems.length-1]
    
    describe('Fetcher.POST testing', () => {
        expectValuesToEqual('subject price', lastElement.price, 'item added price', itemToAdd.price)
    })

}

async function deleteTests(){
    const merchStart = await f.GET(merch_endpoint.item.replace(':item_id', ''))
    await f.DELETE(merch_endpoint.item.replace(':item_id', merchStart.length))
    const merchAfter = await f.GET(merch_endpoint.item.replace(':item_id', ''))

    describe('Fetcher.DELETE testing', () => {
        expectValuesToEqual(`Length at the start: ${merchStart.length}`, merchStart.length, `length at the end: ${merchAfter.length}`, merchAfter.length, false)
    })
}



schemaTypeTests()
constructorTests()
await getTests()
await putTests()
await patchTests()
await postTests()
await deleteTests()

