



// An enum to define types of responses
class Method {
    static GET = 'GET'
    static PUT = 'PUT'
    static POST = 'POST'
    static PATCH = 'PATCH'
    static DELETE = 'DELETE'
}

class Fetcher {

    constructor(baseUrl='', parameters={}){
        this.base_url = baseUrl
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
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const response = await fetch(url, this.getOptions())
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status
        return data
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
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.putOptions()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status

        return data
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
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.postOptions()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status

        return data
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
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.patchOptions()
        options.body = obj.body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        data.status = response.status
        // console.log('patchData data:', data)
        return data
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
        const url = this.base_url + endpoint + Fetcher.parseURLParameters(obj.parameters)
        const options = this.deleteOptions()
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
