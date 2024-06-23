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
import { MockIOFetcher as MockIO } from '../Components/Mockio.mjs'





const resourceLayers = [
    {
        "user": {
            "user_id": { "type": "number" },
            "name": {
                "first": { "type":"string" },
                "last": { "type":"string" }
            }
        }
    }, {
        "task": {
            "task_id": { "type": "number" },
            "title": { "type":"string" }
        }
    }
]

const m = new MockIO(resourceLayers)
console.log(m.endpoints)

