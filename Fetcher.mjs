import { NotFoundError } from 'rxjs'
import { SchemaType } from './SchemaType.mjs'

class Method {
/**
 * @class - Method is an enum class that defines the valid types of requests supported by Fetcher.
 */
    static GET = 'GET' // Receives Data
    static HEAD = 'HEAD' // Receives Headers
    static POST = 'POST' // Creates Data
    static PUT = 'PUT' // Updates Data
    static PATCH = 'PATCH' // Updates Data
    static DELETE = 'DELETE' // Deletes Data
    static CONNECT = 'CONNECT' // Establishes a tunnel to the server
    static OPTIONS = 'OPTIONS' // Describes the communication options for the target resource
    static TRACE = 'TRACE' // Performs a message loop-back test along the path to the target resource
}

class Fetcher {

    /*** @todo test */
    constructor(base_url='', obj={options:{}, parameters:{}}){
    /**
     * @constructor
     * @param { string } base_url - the base URL used to construct http requests
     * @param { object } obj = {
     *      @param { object } parameters - an object containing key-value pairs to be used as query parameters in EVERY request
     *      @param { object } options - an object with headers, method, and other options for http requests
     * }
     */
        this.base_url = base_url
        this.parameters = obj.parameters
        this.options = {
            ... obj.options,
            ... {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    credentials: 'same-origin',
                    'Content-Type': 'application/json'
                },
            method: ''
        }}
    }

    /*** @todo test */
    static #parseURLParameters(parameters1, parameters2){
    /**
     * @static @method
     * @param { Object } parameters - an object containing key-value pairs to be used as query parameters in a request
     * @returns - a string of properly formatted query parameters for appending to the URL
     */
        const mergedParameters = {... parameters1, ...parameters2}
        const queryStr = Object.entries(mergedParameters).map(([key, value]) => `${key}=${value}`).join('&')
        return `?${queryStr}`
    }

    /*** @todo test */
    static #constructURL(base_url, endpoint, parameters1, parameters2){
    /**
     * @static @method
     * @param { string } base_url
     * @param { string } endpoint - the endpoint to be appended to the base_url
     * @param { object } parameters - an object containing key-value pairs to be used in this specific request
     */
        let url = base_url + endpoint
        if(parameters2){ url += Fetcher.#parseURLParameters(parameters1, parameters2) }
        return url
    }

    /*** @todo test */
    options(method=Method.GET, headers=null, body=null){
    /**
     * @static @method
     * @param { string } method - the type of request to be made
     * @param { object } headers - an object containing key-value pairs to be used as headers in the request
     * @param { object } body - an object containing the body of the request (if applicable)
     */
        const options = this.options

        if(headers){
            for(const [key, value] of Object.entries(headers)){
                options.headers[key] = value
            }
        }

        if(body){ options.body = JSON.stringify(body) }

        return options
    }

    /*** @todo test */
    async request(method, endpoint='', obj={headers:null, body:null, parameters: null}){
        if(obj.headers === undefined) obj.headers = null
        if(obj.body === undefined) obj.body = null
        if(obj.parameters === undefined) obj.parameters = null

        const url = Fetcher.#constructURL(this.base_url, endpoint, this.parameters, obj.parameters)
        const options = this.options(method, obj.headers, obj.body)
        const response = await fetch(url, options)
        return response.json()
    }

    /*** @todo test */
    async GET(endpoint='', obj={ headers:{}, parameters:{} }){
        const method = Method.GET
        if(obj.body === undefined || obj.body === null) {
            return await this.request(method, endpoint, obj)
        } else {
            throw new ParameterError(method)
        }
    }

    /*** @todo test */
    async HEAD(endpoint='', obj={ headers:{}, parameters:{} }){
        const method = Method.HEAD
        if(obj.body === undefined || obj.body === null) {
            return await this.request(method, endpoint, obj)
        } else {
            throw new ParameterError(method)
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

class StubError extends NotFoundError {
    constructor(method){
        throw new super(`Stub Error, ${method} request not supported`)
    }
}

class ParameterError extends Error {
    constructor(method){
        throw new super(`Body: ${method} requests DO NOT accept "obj.body"`)
    }
}

export {
    Fetcher,
    SchemaType
}
