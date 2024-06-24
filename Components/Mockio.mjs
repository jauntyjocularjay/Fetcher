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
}

class MockIOFetcher extends Fetcher {
    constructor(resourceLayers=[]){
        super(`https//${ENV.mockio.token}.mockapi.io`)
        this.resources = []

        this.setEndpoints('/api/v1', resourceLayers)
    }

    setEndpoints(prefix, resourceLayers){
        let endpointString = '' + prefix
        
        resourceLayers.forEach(resource => {
            const endpoint = {}
            this.#parseLayers(endpoint, endpointString, resource, true)
            this.resources.push(endpoint)
        })
    }

    #parseLayers(endpoint, endpointString, layer, root=false){
        for(const [key, value] of Object.entries(layer)){
            if(typeof value === 'string'){
                return
            } else {
                let newEndpointString
                root
                    ? newEndpointString = endpointString + `/${key}/:${key}_id`
                    : newEndpointString = endpointString + `/${key}/:${key}`
                this.#parseLayers(endpoint, newEndpointString, value)
                endpoint[key] = newEndpointString
            }
        }
    }





}



export { MockIOFetcher }