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
    tasks: '/api/v1/tasks',
    task: '/api/v1/tasks/:task_id'
}


const merch1 = await f.GET(merch_endpoint.item.replace(':item_id','1'))
const merch1Target = {
    "price": "904.00",
    "name": "Rustic Bronze Hat",
    "id": "1"
}
console.log('merch1', merch1, '\nmerch1Target', merch1Target)

const allTasks = await f.GET(task_endpoint.tasks)
const taskStartLength = allTasks.length
console.log('taskStartLength', taskStartLength)

const task1 = await f.GET(task_endpoint.task.replace(':task_id','1'))
const task1Target = {
    "completed": false,
    "title": "title 1",
    "id": "1"
}

const newTask = await f.POST(task_endpoint.task.replace(':task_id',''))
console.log('newTask', newTask)
const taskNewLength = newTask.id
console.log('taskNewLength', taskNewLength)

let updatedTask = await f.PATCH(task_endpoint.task.replace(':task_id','1'), {body: {completed: true}})

// updatedTask = await f.GET(task_endpoint.task.replace(':task_id','1'))
console.log('updatedTask', updatedTask)


describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectStringToInclude('f.base_url', f.base_url, null, '.mockapi.io')
        expectToBeNull('parameters', f.parameters)
    })

    describe('getData()',() => {
        expectObjectsAreEqual('merch1', merch1, 'merch1Target', merch1Target)
        expectObjectsAreEqual('task1', task1, 'task1Target', task1Target)
    })

    describe('putData()', () => {

    })

    describe('patchData()', () => {
        expectValuesToEqual('(task/1).completed', updatedTask.completed, 'is true', true)
    })

    describe('postData()', () => {
        expectValuesToEqual('start length', taskStartLength, 'new length', taskNewLength - 1)
        expectValuesToEqual('start length', taskStartLength, 'new length', taskNewLength, false)
    })

    describe('deleteData()', () => {

    })
})






