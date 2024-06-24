import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'



class SchemaType {
    static ARRAY = {"type": "array"}
    static BIGINT = {"type": "bigint"}
    static BOOLEAN = {"type": "boolean"}
    static NUMBER = {"type": "number"}
    static OBJECT = {"type": "object"}
    static STRING = {"type": "string"}
    static SYMBOL = {"type": "symbol"}
    static NULL = {"type": "null"}

    static typeMatches(obj){
        const entries = Object.entries(obj)
        if(
            entries.length === 2 &&
            entries[0] === 'type' && (
            entries[1] === 'array' ||
            entries[1] === 'bigint' ||
            entries[1] === 'boolean' ||
            entries[1] === 'number' ||
            entries[1] === 'object' ||
            entries[1] === 'string' ||
            entries[1] === 'symbol' ||
            entries[1] === 'null')
        ){
            return true
        } else {
            return false
        }
    }

    static #typeOf(){
        return 'SchemaType'
    }
}

class MockIOFetcher extends Fetcher {
    constructor(resourceSchemas=[]){
        super(`https//${ENV.mockio.token}.mockapi.io`)
        this.resources = {}

        this.setEndpoints('/api/v1', resourceSchemas)
    }

    setEndpoints(prefix, resourceSchemas){
        let endpointString = '' + prefix
        
        resourceSchemas.forEach(resource => {
            const endpoint = {}
            this.#parseLayers(endpointString, resource, true)
            this.resources.push(endpoint)
        })
    }

    #parseLayers(endpointString, layer, root=false){
        for(const [key, value] of Object.entries(layer)){
            if(SchemaType.typeMatches(value)){
                return                
            } else {
                
            }
        }
    }

    async GET(endpoint, obj={headers:{},parameters:{}}){
        return await super.GET(endpoint, obj)
    }

    async PUT(endpoint, body, obj={headers:{},parameters:{}, body:{}}){
        return await super.PUT(endpoint, obj)
    }

    async POST(endpoint, body, obj={headers:{},parameters:{}, body:{}}){
        return await super.POST(endpoint, obj)
    }

    async PATCH(endpoint, body, obj={headers:{},parameters:{}, body:{}}){
        return await super.PATCH(endpoint, obj)
    }

    async DELETE(endpoint, obj={headers:{},parameters:{}, body:{}}){
        return await super.DELETE(endpoint, obj)
    }
}



export { MockIOFetcher }
