
// An enum to define types of responses
class Method {
    static GET = 'GET'
    static PUT = 'PUT'
    static POST = 'POST'
    static PATCH = 'PATCH'
    static DELETE = 'DELETE'
}

class Fetcher {

    constructor(base_url='', parameters={}){
        this.base_url = base_url
        this.parameters = parameters
    }

    #parameters(){
        return Object.assign(this.#parameters)
    } 

    static logObject(obj){
        for(const [key, value] of Object.entries(obj)){
            console.log(key, value)
        }
    }

    static #parseURLParameters(parameters){
        let result = ''
        for(const [key, value] of Object.entries(parameters)){
            result +=`&${key}=${value}`
        }
        result = '?' + result.slice(1)
        return result
    }

    static #constructEndpoint(base_url, endpoint, obj){
        let url = base_url + endpoint
        if(obj.parameters){
            url += Fetcher.#parseURLParameters(obj.parameters)
        }
        return url
    }

    static #constructOptions(option, obj){
        const options = option
        options.body = JSON.stringify(obj.body)
        return options
    }

    static async #parseString(response){
        const data = await response.json()
        return data
    }

    static methods(){
        return ['getData', 'postData', 'patchData', 'deleteData']
    }

    getOptions(){
        return {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.GET
        }
    }

    async GET(endpoint, obj={parameters:{}}){
        if(obj.body) throw new Error('BodyError: GET requests do not accept bodies')

        const url = Fetcher.#constructEndpoint(this.base_url, endpoint, obj)
        const response = await fetch(url, this.getOptions())
            .catch(err => console.log(err))
        return await Fetcher.#parseString(response)
    }

    putOptions(){
        return {
            body: {}, 
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.PUT
        }    
    }

    /*** @todo test */
    async PUT(endpoint, obj={body: {}, parameters: {}}){
        const url = Fetcher.#constructEndpoint(this.base_url, endpoint, obj)
        const options = Fetcher.#constructOptions(this.putOptions(), obj)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.#parseString(response)
    }

    postOptions(){
        return {
            body: {}, 
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.POST
        }    
    }

    /*** @todo test */
    async POST(endpoint, obj={body: {}, parameters: {}}){
        const url = Fetcher.#constructEndpoint(this.base_url, endpoint, obj)
        const options = Fetcher.#constructOptions(this.postOptions(), obj)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.#parseString(response)
    }

    patchOptions(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.PATCH
        }
    }

    /*** @todo test */
    async PATCH(endpoint, obj={body: {}, parameters: {}}){
        const url = Fetcher.#constructEndpoint(this.base_url, endpoint, obj)
        const options = Fetcher.#constructOptions(this.patchOptions(), obj)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.#parseString(response)
    }

    deleteOptions(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.DELETE
        }
    }

    /*** @todo test */
    async DELETE(endpoint, obj={body: {}, parameters: {}}){
        const url = Fetcher.#constructEndpoint(base_url, endpoint, obj)
        const options = Fetcher.#constructOptions(this.deleteOptions(), obj)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.#parseString(response)
    }
}

export {
    Fetcher
}
