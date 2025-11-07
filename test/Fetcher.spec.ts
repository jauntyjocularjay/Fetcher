import { expect } from 'chai'
import ENV from '../secret.js'
import F from '../Fetcher.js'
import SchemaType from '../SchemaType.js'



F.set.host(`https://${ENV.mockapiio.secret}.mockapi.io`)
const merch_endpoint = {
    item: '/api/v1/merch/:item_id',
    id: '/api/v1/merch/:item_id/id/:new_value',
    uri: '/api/v1/merch/:item_id/image/:image_uri',
    name: '/api/v1/merch/:item_id/name/:item_name',
}
const task_endpoint = {
    all_tasks: '/api/v1/tasks',
    task: '/api/v1/tasks/:task_id',
}
const schemaTypes = [
    SchemaType.ARRAY,
    SchemaType.BIGINT,
    SchemaType.BOOLEAN,
    SchemaType.OBJECT,
    SchemaType.NUMBER,
    SchemaType.INTEGER,
    SchemaType.DECIMAL,
    SchemaType.STRING,
    SchemaType.SYMBOL,
    SchemaType.NULL,
]
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
    { type: 'null' },
]
const failvalue = { type: 'unicorn' }

function schemaTypeTests() {
    describe('SchemaType.matches() value verification and is failable', () => {
        types.forEach((type) => {
            it(`${type} is a valid SchemaType`, () => {
                expect(SchemaType.valid(type)).to.be.true
            })
        })
    })

    describe('SchemaType.typeOf() is SchemaType', () => {
        schemaTypes.forEach((type) => {

            expect(SchemaType.typeOf()).equals('SchemaType')
        })
    })

    describe('Schema.valueOf()', () => {
        schemaTypes.forEach((type) => {
            expect(type.valueOf()).equals(`SchemaType { type: "${type.type}" }`)
        })
    })
}

function constructorTests() {
    describe('Fetcher constructor testing', () => {
        expect(F.defaultHeaders.Host).to.include('https://')
        expect(F.defaultHeaders.Host).includes('.mockapi.io')
    })
}

type Task = {
    completed: boolean
    title: string
    id: number
}

async function getTests() {
    const response = await F.get({endpoint: task_endpoint.task.replace(':task_id', '1')})
    const task1Subject: Task = await response.json()
    const task1Target: Task = {
        completed: false,
        title: 'title 1',
        id: 1,
    }

    describe('Fetcher.GET testing', () => {
        expect(task1Target.completed).equals(task1Subject.completed)
        expect(task1Target.title).equals(task1Subject.title)
        expect(task1Target.id).equals(task1Subject.id)
    })
}

// async function putTests() {
//     const itemID48 = merch_endpoint.item.replace(':item_id', '48')
//     let updatedItem = await F.get({endpoint: itemID48})
//     const newPrice = 4.80
//     updatedItem.price = newPrice
//     await F.put(itemID48, { body: updatedItem })
//     updatedItem = await F.get(itemID48)

//     describe('Fetcher.PUT testing', () => {
//         expect(updatedItem.price).equals(newPrice)
//     })
// }

// async function patchTests() {
//     let updatedItem = await F.get(merch_endpoint.item.replace(':item_id', 30))
//     const newPrice = '3.00'
//     updatedItem.price = newPrice
//     await f.PATCH(merch_endpoint.item.replace(':item_id', 30), {
//         body: updatedItem,
//     })
//     updatedItem = await F.get(merch_endpoint.item.replace(':item_id', 30))

//     describe('Fetcher.PATCH testing', () => {
//         expectValuesToEqual(
//             'subject price',
//             updatedItem.price,
//             'newPrice',
//             newPrice
//         )
//     })
// }

// async function postTests() {
//     const itemToAdd = {
//         price: '3.14',
//         name: 'Strawberry Rhubarb Pi',
//         id: '1',
//     }

//     await f.POST(merch_endpoint.item.replace(':item_id', ''), {
//         body: itemToAdd,
//     })
//     const allItems = await F.get(merch_endpoint.item.replace(':item_id', ''))
//     const lastElement = allItems[allItems.length - 1]

//     describe('Fetcher.POST testing', () => {
//         expectValuesToEqual(
//             'subject price',
//             lastElement.price,
//             'item added price',
//             itemToAdd.price
//         )
//     })
// }

// async function deleteTests() {
//     const merchStart = await F.get(merch_endpoint.item.replace(':item_id', ''))
//     await f.DELETE(merch_endpoint.item.replace(':item_id', merchStart.length))
//     const merchAfter = await F.get(merch_endpoint.item.replace(':item_id', ''))

//     describe('Fetcher.DELETE testing', () => {
//         expectValuesToEqual(
//             `Length at the start: ${merchStart.length}`,
//             merchStart.length,
//             `length at the end: ${merchAfter.length}`,
//             merchAfter.length,
//             false
//         )
//     })
// }

schemaTypeTests()
constructorTests()
// await getTests()
// await putTests()
// await patchTests()
// await postTests()
// await deleteTests()
