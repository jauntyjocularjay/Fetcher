import {
    Fetcher
} from '../Fetcher.mjs'
import ENV from '../secret.mjs'



class MockAPI extends Fetcher {
    static TYPE = {
        array: {"type": "array"},
        bigint: {"type": "bigint"},
        boolean: {"type": "boolean"},
        number: {"type": "number"},
        object: {"type": "object"},
        string: {"type": "string"},
        symbol: {"type": "symbol"},
        nulled: {"type": "null"}
    }
    constructor(resourceLayers=[]){
        super(`https//${ENV.mockio.token}.mockapi.io`)

        resourceLayers.forEach(resource => {
            if( resource.type === undefined ||
                resource.type === MockAPI.array.type ||
                resource.type === MockAPI.bigint.type ||
                resource.type === MockAPI.boolean.type ||
                resource.type === MockAPI.number.type ||
                resource.type === MockAPI.object.type ||
                resource.type === MockAPI.string.type ||
                resource.type === MockAPI.symbol.type ||
                resource.type === MockAPI.nulled.type ){
                throw new Error('')
            }


            for(const [key, value] of Object.entries(resource)){                
                endpoint[key] = value
            }
        })
    }
}

const resourceLayers = [{
    "user": {
        "user_id": { "type": "number" },
        "name": { "type":"string" }
    }
}, {
    "task": {
        "task_id": { "type": "number" },
        "title": { "type":"string" }
    }
}]


export { MockAPI as MockAPIFetcher }