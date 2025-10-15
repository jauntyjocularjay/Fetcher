import ENV from './secret'

class RequestMethod {
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

const Fetcher = {
    headers: {
        Accept: {
            jsonplain: 'application/json, text/plain, */*',
            application: {
                json: 'application/json'
                },
            html: 'text/html; q=1.0',
            text: 'text/*; q=0.8',
            image: {
                gif: 'image/gif; q=0.6',
                jpg: 'image/jpeg; q=0.6',
                wild: 'image/*; q=0.5'
            },
            wild: '*/*; q=0.1',
        },
        'Accept-Language': {
            en: 'en',
            enesfr: 'en; q=1.0, es; q=0.9, fr; q=0.6',
            enesfrde: 'en; q=1.0, es; q=0.9, fr; q=0.6, de; q=0.5',
        },
        Authorization: { bearer: 'Bearer :bearer_token' },
        'Content-Type': {
            application: {
                json: 'application/json',
                pdf: 'application/pdf',
                xml: 'application/xml',
                zip: 'application/zip',
            },
            image: {
                png: 'image/png',
                jpg: 'image/jpg',
                gif: 'image/gif'
            },
            text: {
                plain: 'text/plain',
                css: 'text/css',
                csv: 'text/csv',
                html: 'text/html',
                javascript: 'text/javascript',
                xml: 'text/xml' ,
            },
        },
        credentials: { origin: 'same-origin' },
        Host: {
            secure: 'https://www.:domain.com',
            unsecure: 'http://www.:domain.com',
        },
    },
    get: () => {},
    head: () => {},
    post: () => {},
    put: () => {},
    patch: () => {},
    deleteRequest: () => {},
    connect: () => {},
    trace: () => {},
    set: {
        accept: (accept: string) => setAccept(accept),
        contentType: (contentType: string) => setContentType(contentType),
        host: (host: string) => setHost(host),
        bearer: (token: string) => setBearer(token),
    },
}

const defaultHeaders = {
    Accept: Fetcher.headers.Accept.application.json,//'application/json, text/plain, */*',
    credentials: 'same-origin',
    'Content-Type': 'application/json',
    'Accept-Language': 'en; q=1.0, es; q=0.9, fr; q=0.6, de; q=0.5',
    Authorization: 'Bearer :bearer',
    Host: '',
}

function setAccept(accept: string) {
    defaultHeaders.Accept = accept
}
function setContentType(contentType: string) {
    defaultHeaders['Content-Type'] = contentType
}
function setHost(host: string) {
    defaultHeaders.Host = host
}
function setBearer(token: string) {
    defaultHeaders.Authorization.replace(':bearer', token)
}
async function get(endpoint: string, body: object, headers: Headers) {
    let payload: string | null = body ? JSON.stringify(body) : null
    endpoint = ENV.base_url + endpoint

    return await fetch(endpoint, {
        method: RequestMethod.GET,
        headers: headers,
        body: payload,
    })
}
function head() {}
function post() {}
function put() {}
function patch() {}
function deleteRequest() {}
function connect() {}
function options() {}
function trace() {}


export { Fetcher as default, defaultHeaders }
