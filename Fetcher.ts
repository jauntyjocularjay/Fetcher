import { SchemaType } from './SchemaType.mjs'
import { Method } from './Method.mjs'



class Fetcher {
    base_url: string
    parameters: object

    /*** @todo test */
    constructor(base_url:string, parameters: object){
    /**
     * @constructor
     * @param { string } base_url - the base URL used to construct http requests
     * @param { object } parameters - an object containing key-value pairs to be used as query parameters in EVERY request
     */
        this.base_url = base_url
        this.parameters = parameters
    }

    /*** @todo test */
    #parseURLParameters(parameters2: object){
    /**
     * @static @method
     * @param { Object } parameters - an object containing key-value pairs to be used as query parameters in a request
     * @returns - a string of properly formatted query parameters for appending to the URL
     */
        const mergedParameters = {... this.parameters, ...parameters2}
        const queryStr = Object.entries(mergedParameters).map(([key, value]) => `${key}=${value}`).join('&')
        return `?${queryStr}`
    }

    /*** @todo test */
    #constructURL(base_url: string, endpoint: string, parameters2: object){
    /**
     * @static @method
     * @param { string } base_url
     * @param { string } endpoint - the endpoint to be appended to the base_url
     * @param { object } parameters - an object containing key-value pairs to be used in this specific request
     */
        let url = base_url + endpoint
        if(parameters2){ url += this.#parseURLParameters(parameters2) }
        return url
    }

    /*** @todo test */
    options(method: Method, headers: object, body: object){
    /**
     * @static @method
     * @param { string } method - the type of request to be made
     * @param { object } headers - an object containing key-value pairs to be used as headers in the request
     * @param { object } body - an object containing the body of the request (if applicable)
     */
        const options = {
            headers: {
                Accept: 'application/json, text/plain, */*',
                credentials: 'same-origin',
                'Content-Type': 'application/json'
            },
            body: '',
            method: method
        }

        if(headers){
            for(const [key, value] of Object.entries(headers)){
                options.headers[key] = value
            }
        }

        if(body){ options.body = JSON.stringify(body) }

        return options
    }

    /*** @todo test */
    async request(method: Method, endpoint: string, obj={headers:{}, parameters:{}, body:''}){

        const url = this.#constructURL(this.base_url, endpoint, obj.parameters)
        const options = this.options(method, obj.headers, obj.body)
        const response = await fetch(url, options)
        return response.json()

    }

    async GET(endpoint='', obj={ headers:{}, parameters:{}, body:'' }){

        if(obj.body === undefined || obj.body === null) {
            return await this.request(Method.GET, endpoint, obj)
        } else {
            throw new Error('BodyError: GET requests DO NOT accept "obj.body"')
        }

    }

    /*** @todo test */
    async HEAD(endpoint='', obj={ headers:{}, parameters:{}, body:{} }){

        if(obj.body === undefined || obj.body === null) {
            return await this.request(Method.HEAD, endpoint, obj)
        } else {
            throw new Error('BodyError: HEAD requests DO NOT accept "obj.body"')
        }

    }

    /*** @todo test */
    async PUT(endpoint='', obj={ headers:{}, body: {}, parameters: {} }){
        return await this.request(Method.PUT, endpoint, obj)
    }

    /*** @todo test */
    async POST(endpoint='', obj={ headers:{}, body: {}, parameters: {} }){
        return await this.request(Method.POST, endpoint, obj)
    }

    /*** @todo test */
    async PATCH(endpoint='', obj={ headers:{}, body: {}, parameters: {} }){
        return await this.request(Method.PATCH, endpoint, obj)
    }

    /*** @todo test */
    async DELETE(endpoint='', obj={ headers:{}, body: {}, parameters: {} }){
        return await this.request(Method.DELETE, endpoint, obj)
    }

    /*** @todo test */
    async CONNECT(endpoint='', obj= { headers:{}, parameters: {}}){
        const method = Method.CONNECT
        if(obj.body === undefined || obj.body === null) {
            return await this.request(method, endpoint, obj)
        } else {
            throw new ParameterError(method)
        }
    }

    /*** @todo test */
    async OPTIONS(){
        throw new StubError(Method.OPTIONS)
    }

    /*** @todo test */
    async TRACE(){
        throw new StubError(Method.TRACE)
    }

}

class StubError extends Error {
    constructor(method: Method){
        super(`Stub Error, ${method} request not supported yet`)
    }
}

class ParameterError extends Error {
    constructor(method: Method){
        super(`Body: ${method} requests DO NOT accept "obj.body"`)
    }
}

export {
    Fetcher,
    SchemaType
}