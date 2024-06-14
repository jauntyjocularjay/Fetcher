
// An enum to define types of responses
class Method {
    static GET = 'GET'
    static POST = 'POST'
    static PATCH = 'PATCH'
    static DELETE = 'DELETE'
}

class Fetcher {

    constructor(){
        this.access_token = ''
        this.refresh_token = ''
        this.base_url = ''
    }

    static async parseString(response){
        const data = await response.json()
        return data
    }

    static methods(){
        return ['getData', 'postData', 'patchData', 'deleteData']
    }

    GET(){
        return {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + this.access_token
            },
            method: Method.GET
        }
    }

    async getData(endpoint){
        const url = this.base_url + endpoint
        const options = this.GET()
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)
        return data
    }

    POST(){
        return {
            body: {}, 
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + this.access_token
            },
            method: Method.POST
        }    
    }

    // test this
    async postData(endpoint, body={}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint
        const options = this.POST()
        options.body = body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)

        return data
    }

    PATCH(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + this.access_token
            },
            method: Method.PATCH
        }
    }

    // test this
    async patchData(endpoint, body={}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint
        const options = this.PATCH()
        options.body = body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)

        return data
    }

    DELETE(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + this.access_token
            },
            method: Method.DELETE
        }
    }

    // test this
    async deleteData(endpoint, body={}){
    /**
     * @todo test
     */
        const url = this.base_url + endpoint
        const options = this.DELETE()
        options.body = body
        const response = await fetch(url, options)
            .catch(err => console.log(err))
        const data = await Fetcher.parseString(response)

        return data
    }
}

export {
    Fetcher
}




