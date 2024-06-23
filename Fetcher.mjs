class Method {
/**
 * @class - Method is an enum class that defines the valid types of requests supported by Fetcher.
 */
    static GET = 'GET'
    static PUT = 'PUT'
    static POST = 'POST'
    static PATCH = 'PATCH'
    static DELETE = 'DELETE'
}

class Fetcher {

    /*** @todo test */

    constructor(base_url='', parameters=null){
    /**
     * @constructor
     * @param { string } base_url - the base URL used to construct http requests
     * @param { object } parameters - an object containing key-value pairs to be used as query parameters in EVERY request
     */
        this.base_url = base_url
        this.parameters = parameters
    }

    /*** @todo test */
    static #parseURLParameters(parameters){
    /**
     * @static @method
     * @param { Object } parameters - an object containing key-value pairs to be used as query parameters in a request
     * @returns - a string of properly formatted query parameters for appending to the URL
     */
        const mergedParameters = {... this.parameters, ...parameters}
        const queryStr = Object.entries(mergedParameters).map(([key, value]) => `${key}=${value}`).join('&')
        return `?${queryStr}`
    }

    /*** @todo test */
    static #constructURL(base_url, endpoint, parameters){
    /**
     * @static @method
     * @param { string } base_url
     * @param { string } endpoint - the endpoint to be appended to the base_url
     * @param { object } parameters - an object containing key-value pairs to be used in this specific request
     */
        let url = base_url + endpoint
        if(parameters){ url += Fetcher.#parseURLParameters(this.parameters, parameters) }
        return url
    }

    /*** @todo test */
    static #options(method=Method.GET, headers={}, body=null){
    /**
     * @static @method
     * @param { string } method - the type of request to be made
     * @param { object } headers - an object containing key-value pairs to be used as headers in the request
     * @param { object } body - an object containing the body of the request (if applicable)
     */
        const options = {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: method
        }

        for(const [key, value] of Object.entries(headers)){
            options.headers[key] = value
        }

        if(body){ options.body = JSON.stringify(body) }

        return options
    }

    /*** @todo test */
    async request(method, endpoint='', obj={headers:null, body:null, parameters: null}){
        if(obj.headers === undefined) obj.headers = null
        if(obj.body === undefined) obj.body = null
        if(obj.parameters === undefined) obj.parameters = null

        const url = Fetcher.#constructURL(this.base_url, endpoint, obj.parameters)
        const options = Fetcher.#options(method)
        const response = await fetch(url, options)
        return response.json()
    }

    /*** @todo test */
    async GET(endpoint='', obj={ headers:{}, parameters:{} }){
        if(obj.body === undefined || obj.body === null) {
            return await this.request(Method.GET, endpoint, obj)
        } else {
            throw new Error('BodyError: GET requests DO NOT accept "obj.body"')
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
}

export {
    Fetcher
}
