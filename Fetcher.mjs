
// An enum to define types of responses
class Method {
    static GET = 'GET'
    static PUT = 'PUT'
    static POST = 'POST'
    static PATCH = 'PATCH'
    static DELETE = 'DELETE'
}



class Fetcher {

    constructor(baseUrl){
        this.base_url = baseUrl
    }

    static async parseString(response){
        const data = await response.json()
        return data
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

    GET(){
        return {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.GET
        }
    }

    async getData(endpoint, obj={parameters: {}}){
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.GET()
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        return data
    }

    PUT(){
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
    async putData(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.PUT()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status

        return data
    }

    POST(){
        return {
            body: {}, 
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.POST
        }    
    }

    async postData(endpoint, obj={body: {}, parameters: {}}){
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.POST()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status

        return data
    }

    PATCH(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.PATCH
        }
    }

    async patchData(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.PATCH()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status
        // console.log('patchData data:', data)
        return data
    }

    DELETE(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*'
            },
            method: Method.DELETE
        }
    }

    async deleteData(endpoint, obj={body: {}, parameters: {}}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.DELETE()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        console.log('deleteData response:', response)
        const data = await Fetcher.parseString(response)
        data.status = response.status


        return data
    }
}

export {
    Fetcher
}
