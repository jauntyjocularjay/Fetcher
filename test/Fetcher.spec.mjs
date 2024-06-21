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
const user_endpoint = {
    user: '/api/v1/users/:user_id',
    id: '/api/v1/users/:user_id/id/:new_value',
    avatar: '/api/v1/users/:user_id/avatar/:url/',
    name: '/api/v1/users/:user_id/name/:user_name'
}
const task_endpoint = {
    tasks: '/api/v1/tasks/',
    task: '/api/v1/tasks/:task_id'
}


const user1 = await f.GET(user_endpoint.user.replace(':user_id','1'))
const user1Target = {
    "createdAt": "2024-06-20T17:06:46.284Z",
    "name": "Sadie Brown",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/290.jpg",
    "id": "1"
}

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


describe('Fetcher.mjs',() => {
    describe('constructor', () => {
        expectStringToInclude('f.base_url', f.base_url, null, '.mockapi.io')
        expectObjectsAreEqual('parameters', f.parameters, 'empty object', {})
    })

    describe('getData()',() => {
        expectObjectsAreEqual('user1', user1, 'user1Target', user1Target)
        expectObjectsAreEqual('task1', task1, 'task1Target', task1Target)
    })

    describe('putData()', () => {
        
    })

    describe('patchData()', () => {

    })

    describe('postData()', () => {
        expectValuesToEqual('start length', taskStartLength, 'new length', taskNewLength - 1)
    })

    describe('deleteData()', () => {

    })
})






