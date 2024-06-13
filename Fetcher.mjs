
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

    static parseString(response){
        const data = JSON.parse(response)
        return data
    }

    static methods(){
        return ['getData', 'postData', 'patchData', 'deleteData']
    }

    GET(){
        return {
            body: {},
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer ' + this.access_token
            },
            method: Method.GET
        }
    }

    async getData(url, body={}){
        var data
        const options = this.GET()
        options.body = body
        await fetch(url, options)
            .then(response => {
                data = Fetcher.parseString(response)
            })
            .catch(err => console.log(err))

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

    async postData(url, body={}){
        var data
        const options = this.POST()
        options.body = body
        await fetch(url, options)
            .then(response => {
                data = Fetcher.parseString(response)
            })
            .catch(err => console.log(err))

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

    async patchData(url, body={}){
        var data
        const options = this.PATCH()
        options.body = body
        await fetch(url, options)
            .then(response => {
                data = Fetcher.parseString(response)
            })
            .catch(err => console.log(err))
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

    async deleteData(url, body={}){
        var data
        const options = this.DELETE()
        options.body = body
        await fetch(url, options)
            .then(response => {
                data = Fetcher.parseString(response)
            })
            .catch(err => console.log(err))

        return data
    }
}

export {
    Fetcher,
}




