
/*
class Type {
    static ARRAY = () => {
        return {
            type: 'array',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('array')
        }
    }
    static BIGINT = () => {
        return {
            type: 'bigint',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('bigint')
        }
    }
    static BOOLEAN = () => {
        return {
            type: 'boolean',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('boolean')
        }
    }
    
    static NUMBER = () => {
        return {
            type: 'number',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('number')
        }
    }

    static INTEGER = () => {
        return {
            type: 'integer',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('integer')
        }
    }

    static DECIMAL = () => {
        return {
            type: 'decimal',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('decimal')
        }
    }

    static OBJECT = () => {
        return {
            type: 'object',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('object')
        }
    }
    
    static STRING = () => {
        return {
            type: 'string',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('string')
        }
    }
    
    static SYMBOL = () => {
        return {
            type: 'symbol',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('symbol')
        }
    }
    
    static NULL = () => {
        return {
            type: 'null',
            typeOf: Type.typeOf(),
            valueOf: Type.valueOf('null')
        }
    }
    

    static typeOf = () => {
        return 'SchemaType'
    }

    static valueOf = (str: string) => {
        return Type.typeOf() + `{ ${str} }`
    }
}

enum SchemaType {
    ARRAY,
    BIGINT,
    BOOLEAN,
    NUMBER,
    INTEGER,
    DECIMAL,
    OBJECT,
    STRING,
    SYMBOL,
    NULL
}
*/

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

class Headers {
    Accept: string
    credentials: string
    'Content-Type': string
    'Content-Length': number
    'Accept-Language': string
    Authorization: string
    Host: string

    constructor(){
        this.Accept = 'application/json, text/plain, */*'
        this.credentials = 'same-origin'
        this['Content-Type'] = 'application/json'
        this['Content-Length'] = 0
        this['Accept-Language'] = 'en; q=1.0, es; q=0.9, fr; q=0.6, de; q=0.5',
        this.Authorization = 'Bearer xxx'
        this.Host = ''
    }
}

class Options {
    method: Method
    headers: Headers
    body: string

    constructor(method: Method, headers: Headers, body: string){
        this.method = method
        this.headers = headers
        this.body = body
    }

    // transform(){
    //     return RequestInit {
    //         'method': this.method,
    //         'headers': this.headers,
    //         'body': JSON.stringify(this.body)
    //     }
    // }
}

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
    #constructURL(base_url: string, endpoint: string){
    /**
     * @static @method
     * @param { string } base_url
     * @param { string } endpoint - the endpoint to be appended to the base_url
     * @param { object } parameters - an object containing key-value pairs to be used in this specific request
     */
        let url = base_url + endpoint
        return url
    }

    /*** @todo test */
    options(method: Method, headers: Headers, body: string){
    /**
     * @static @method
     * @param { string } method - the type of request to be made
     * @param { object } headers - an object containing key-value pairs to be used as headers in the request
     * @param { object } body - an object containing the body of the request (if applicable)
     */
        return new Options(method, headers, body)
    }

    /*** @todo test */
    async request(endpoint: string, options: Options){
        const url = this.#constructURL(this.base_url, endpoint)
        const response = await fetch(url, options)
        // const response = await fetch(url, options.transform())
        return response.json()
    }

    

    async noBodyRequest(endpoint: string, options: Options){
        if(options.body === '') {
            return await this.request(endpoint, options)
        } else {
            throw new ParameterError(options.method)
        }
    }

    async GET(endpoint: string, options: Options){
        return await this.noBodyRequest(endpoint, options)
    }

    /*** @todo test */
    async HEAD(endpoint='', options: Options){
        return await this.noBodyRequest(endpoint, options)
    }

    /*** @todo test */
    async PUT(endpoint='', options: Options){
        return await this.request(endpoint, options)
    }

    /*** @todo test */
    async POST(endpoint: string, options: Options){
        return await this.request(endpoint, options)
    }

    /*** @todo test */
    async PATCH(endpoint: string, options: Options){
        return await this.request(endpoint, options)
    }

    /*** @todo test */
    async DELETE(endpoint: string, options: Options){
        return await this.request(endpoint, options)
    }

    /*** @todo test */
    async CONNECT(endpoint: string, options: Options){
        return await this.noBodyRequest(endpoint, options)
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
        super(`Body: ${method} requests DO NOT accept "options.body"`)
    }
}

export {
    Fetcher,
    Method,
    Headers,
    Options,
    SchemaType
}