import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'

class MockIOFetcher extends Fetcher {
    constructor(resourceSchemas={}){
        super(`https//${ENV.mockio.token}.mockapi.io`)
        this.resources = {}

        this.setEndpoints('/api/v1', resourceSchemas)
    }

    setEndpoints(prefix, resourceSchemas){
        let endpointString = '' + prefix

        for(const [key, value] of Object.entries(resourceSchemas)){
            
        }
        /**
 const resourceLayers = {
    "user": {
        "id": { "type": "number" },
        "name": {
            "first": { "type":"string" },
            "last": { "type":"string" }
        },
        "task": { "type": "array" }
    },
    "task": {
        "task_id": { "type": "number" },
        "title": { "type":"string" },
        "completed": { "type":"boolean" }
    }
}
         */


        // resourceSchemas.forEach(resource => {
        //     const endpoint = {}
        //     this.#parseLayers(endpointString, resource, true)
        //     this.resources.push(endpoint)
        // })
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
