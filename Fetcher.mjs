
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

    static async parseString(response){
        const data = await response.json()
        return data
    }

    parameters(){
        return Object.assign(this.parameters)
    }

    static parseURLParameters(parameters){
        let result = ''
        for(const [key, value] of Object.entries(parameters)){
            result +=`&${key}=${value}`
        }
        result = '?' + result.slice(1)
        return result
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

    async GET(endpoint, obj={parameters: {}}){
        if(obj.body) throw new Error('BodyError: GET requests do not accept bodies')
        let url = this.base_url + endpoint
        if(obj.parameters) url += Fetcher.parseURLParameters(obj.parameters)
        const response = await fetch(url, this.getOptions())
            .catch(err => console.log(err))
        return await Fetcher.parseString(response)
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

    // test this
    async PUT(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        let url = this.base_url + endpoint
        if(obj.parameters) url += Fetcher.parseURLParameters(obj.parameters)
        const options = this.putOptions()
        options.body = JSON.stringify(obj.body)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.parseString(response)
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

    async POST(endpoint, obj={body: {}, parameters: {}}){
        let url = this.base_url + endpoint
        if(obj.parameters) url += Fetcher.parseURLParameters(obj.parameters)
        const options = this.postOptions()
        options.body = JSON.stringify(obj.body)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.parseString(response)
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

    async PATCH(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        let url = this.base_url + endpoint
        if(obj.parameters) url += Fetcher.parseURLParameters(obj.parameters)
        const options = this.patchOptions()
        options.body = JSON.stringify(obj.body)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.parseString(response)
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

    async DELETE(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        let url = this.base_url + endpoint
        if(obj.parameters) url += Fetcher.parseURLParameters(obj.parameters)
        const options = this.deleteOptions()
        options.body = JSON.stringify(obj.body)
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        return await Fetcher.parseString(response)
    }
}

export {
    Fetcher
}
