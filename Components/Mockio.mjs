import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'



class MockIOFetcher extends Fetcher {
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
        console.log(ENV.mockio.token)
        super(`https//${ENV.mockio.token}.mockapi.io`)
        this.endpoints = {}

        this.setEndpoints(resourceLayers)
    }

    setEndpoints(resourceLayers){
        resourceLayers.forEach(resource => {
            if(typeof resource !== 'object'){ throw new TypeError('Resource-layers should contain a schema object') }
            let endpoint = ''

            for(let [key, value] of Object.entries(resource)){                
                endpoint += `/${key}/:${key}_id`
                this.endpoints[key] = endpoint
                if(typeof value !== 'string'){
                    key = value
                }
            }
        })
    }
}


export { MockIOFetcher }