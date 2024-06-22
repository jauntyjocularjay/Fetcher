// import {
//     expectToBeTrue,
//     expectValuesToMatch,
//     expectValuesToEqual,
//     expectArraysToBeEqual,
//     expectArrayToInclude,
//     expectArraytoIncludeArrayContents,
//     objectsAreEquivalent,
//     expectStringToInclude,
//     expectObjectsAreEqual,
//     expectToBeNull,
//     throwsError,
//     expectConstructorToThrowError
// } from '../module/chaitests/Chai.mjs'
// import { 
//     expect,
//     should
// } from 'chai'
// import { ENV } from '../secret.mjs'
// import { BeecptorFetcher as Beeceptor } from '../Components/Beeceptor.mjs'




// const b = new Beeceptor('todos')
// const length = 0

// class TodoItem {
//     static #id = 0
//     constructor(title='title', completed=false){
//         this.id = TodoItem.#id
//         TodoItem.#id++
//         this.title = title
//         this.completed = completed
//     }

//     static setID(id){
//         TodoItem.#id = id
//     }
// }

// async function setup(){
//     let todoList = await b.GET()
//     TodoItem.setID(todoList.length)
//     console.log('setup complete')
// }


// async function POSTtests(){
//     const item1 = new TodoItem('read a book', false)

//     describe('POST operation', async () => {
//         it('postResponseJSON', async () => {
//             await b.POST('', { body: item1 })
//                 .then( result => {
//                     expect(result).to.be.an('object')
//                     expect(result.completed).to.be.false
//                 })
//         })
//     })    
// }

// async function GETtests(){
//     describe('GET operation', async () => {
//         it('getTodoList', async () => {
//             await b.GET()
//                 .then( result => {
//                     expect(result).to.be.an('array')
//                     expect(result.length).to.be.greaterThan(0)
//                     length = result.length
//                 })
//         })

//         it('getTodoItem', async () => {
//             await b.GET(`/${length-1}`)
//                 .then( result => {
//                     expect(result).to.be.an('object')
//                     expect(result.id).to.be.a('number')
//                     expect(result.title).to.be.a('string')
//                     expect(result.completed).to.be.a('boolean')
//                 })
//         })
//     })    
// }


// await setup()


// describe('Fetcher on Beecepter', () => {

//     POSTtests()
//     GETtests()

// })


