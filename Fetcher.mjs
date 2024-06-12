// I forget why I did this this way
// class Body {
//     constructor(data){
//         this.records = {};
//         this.data = data;
//     }
// }

/**
 * @class takes response string and parses it as JSON
 */
class ParsedResponse {
    constructor(response){
        return JSON.parse(response)
    }
}

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
                data = new ParsedResponse(response)
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
                data = new ParsedResponse(response)
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
                data = new ParsedResponse(response)
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
                data = new ParsedResponse(response)
            })
            .catch(err => console.log(err))

        return data
    }
}

export {
    ParsedResponse,
    Method,
    Fetcher
}

