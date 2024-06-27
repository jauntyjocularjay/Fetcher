import { Method } from './Method.mjs'




class Fetcher {
    base_url: string
    parameters: object

    /*** @todo test */
    constructor(base_url='', parameters={}){
    /**
     * @constructor
     * @param { string } base_url - the base URL used to construct http requests
     * @param { object } parameters - an object containing key-value pairs to be used as query parameters in EVERY request
     */
        this.base_url = base_url
        this.parameters = parameters
    }

    /*** @todo test */
    static #parseURLParameters(parameters1: object, parameters2: object){
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
    static #constructURL(base_url: string, endpoint: string, parameters1: object, parameters2: object){
    /**
     * @static @method
     * @param { string } base_url
     * @param { string } endpoint - the endpoint to be appended to the base_url
     * @param { object } parameters - an object containing key-value pairs to be used in this specific request
     */
        let url = base_url + endpoint
        // new check needed
        if(parameters2){ url += Fetcher.#parseURLParameters(parameters1, parameters2) }
        return url
    }

    /*** @todo test */
    options(method=Method.GET, headers={}, body={}){
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
            body: JSON.stringify(body),
            method: method
        }

        if(headers){
            for(const [key, value] of Object.entries(headers)){
                options.headers[key] = value
            }
        }

        return options
    }

    /*** @todo test */
    async request(method=Method.GET, endpoint='', obj={headers:{}, body:{}, parameters:{}}){
        if(!obj.headers) obj.headers= {}
        if(!obj.body) obj.body = {}
        if(!obj.parameters) obj.parameters = {}

        const url = Fetcher.#constructURL(this.base_url, endpoint, this.parameters, obj.parameters)
        const options = this.options(method, obj.headers, obj.body)
        const response = await fetch(url, options)
        return response.json()
    }

    async GET(endpoint='', obj={ headers:{}, parameters:{}, body:{} }){
        return await this.request(Method.GET, endpoint, obj)
    }

    /*** @todo test */
    async HEAD(endpoint='', obj={ headers:{}, parameters:{}, body:{} }){
        obj.body = {}  // strips away a body
        return await this.request(Method.HEAD, endpoint, obj)
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
}

class Body {

}

export {
    Fetcher
}
