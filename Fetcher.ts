import ENV from './secret'

type Header = {
    Accept: string
    credentials: string
    'Content-Type': string
    'Accept-Language': string
    Authorization: string
    Host: string
}

type Request = {
    method: RequestMethod
    endpoint: string
    headers: Header
    body: any
}

enum RequestMethod {
    /**
     * @class - RequestMethod is an enum that defines the valid types of requests supported by Fetcher.
     */
    GET = 'GET', // Receives Data
    HEAD = 'HEAD', // Receives Headers
    POST = 'POST', // Creates Data
    PUT = 'PUT', // Updates Data
    PATCH = 'PATCH', // Updates Data
    DELETE = 'DELETE', // Deletes Data
    CONNECT = 'CONNECT', // Establishes a tunnel to the server
    OPTIONS = 'OPTIONS', // Describes the communication options for the target resource
    TRACE = 'TRACE', // Performs a message loop-back test along the path to the target resource
}

const headers = {
    Accept: {
        jsonplain: 'application/json, text/plain, */*',
        application: {
            json: 'application/json',
            xml: 'application/xml',
        },
        html: 'text/html; q=1.0',
        text: {
            json: 'text/json',
            xml: 'text/xml',
            wild: 'text/*; q=0.8',
        },
        image: {
            gif: 'image/gif; q=0.6',
            jpg: 'image/jpeg; q=0.6',
            webp: 'image/webp; q=0.6',
            wild: 'image/*; q=0.5',
        },
        wild: '*/*; q=0.1',
    },
    'Accept-Language': {
        en: 'en',
        enesfr: 'en; q=1.0, es; q=0.9, fr; q=0.6',
        enesfrde: 'en; q=1.0, es; q=0.9, fr; q=0.6, de; q=0.5',
    },
    Authorization: {
        Bearer: 'Bearer :token',
        Basic: 'Basic :token',
        Digest: () => {
            throw new Error('Stub: Not implemented')
        },
        HOBA: () => {
            throw new Error('Stub: Not implemented')
        },
        Mutual: () => {
            throw new Error('Stub: Not implemented')
        },
        Negotiate: () => {
            throw new Error('Stub: Not implemented')
        },
        VAPID: () => {
            throw new Error('Stub: Not implemented')
        },
        SCRAM: () => {
            throw new Error('Stub: Not implemented')
        },
        AWS4: () => {
            throw new Error('Stub: Not implemented')
        },
    },
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
            gif: 'image/gif',
        },
        text: {
            plain: 'text/plain',
            css: 'text/css',
            csv: 'text/csv',
            html: 'text/html',
            javascript: 'text/javascript',
            xml: 'text/xml',
        },
    },
    credentials: { origin: 'same-origin' },
    Host: {
        secure: 'https://www.:domain.com',
        unsecure: 'http://www.:domain.com',
    },
}

const defaultHeaders = {
    Accept: headers.Accept.application.json,
    credentials: 'same-origin',
    'Content-Type': headers['Content-Type'].application.json,
    'Accept-Language': headers['Accept-Language'].enesfrde,
    Authorization: 'Bearer :bearer',
    Host: '',
} as Header

const Fetcher = Object.freeze({
    headers: headers,
    get: async (request: Partial<Request>) => await get(request),
    head: async (request: Partial<Request>) => await head(request),
    option: async (request: Partial<Request>) => await options(request),
    post: async (request: Partial<Request>) => await post(request),
    put: async (request: Partial<Request>) => await put(request),
    patch: async (request: Partial<Request>) => await patch(request),
    delete: async (request: Partial<Request>) =>
        await deleteRequest(request),
    connect: async (request: Partial<Request>) => await connect(request),
    trace: async (request: Partial<Request>) => await trace(request),
    set: {
        headers: async (headers: Partial<Header>) => setDefaultHeaders(headers),
        accept: (accept: string) => setDefaultAccept(accept),
        contentType: (contentType: string) => setDefaultContentType(contentType),
        host: (host: string) => setDefaultHost(host),
        bearer: (token: string) => setDefaultBearer(token),
    },
    defaultHeaders: defaultHeaders
})

function setDefaultHeaders(headers: Partial<Header>) {
    if (headers.Accept) defaultHeaders.Accept = headers.Accept
    if (headers.credentials) defaultHeaders.credentials = headers.credentials
    if (headers['Content-Type'])
        defaultHeaders['Content-Type'] = headers['Content-Type']
    if (headers['Accept-Language'])
        defaultHeaders['Accept-Language'] = headers['Accept-Language']
    if (headers.Authorization)
        defaultHeaders.Authorization = headers.Authorization
    if (headers.Host) defaultHeaders.Host = headers.Host
}

function setDefaultAccept(accept: string) {
    defaultHeaders.Accept = accept
}

function setDefaultContentType(contentType: string) {
    defaultHeaders['Content-Type'] = contentType
}

function setDefaultHost(host: string) {
    defaultHeaders.Host = host
}

function setDefaultBearer(token: string) {
    defaultHeaders.Authorization.replace(':token', token)
}

async function fetchRequest(request: Partial<Request>) {
    const { method, endpoint, body, headers } = request
    let payload: string | null = body ? JSON.stringify(body) : null
    const url = ENV.API.base_url + endpoint
    let response: Response

    try {
        response = await fetch(url, {
            method: method,
            headers: headers,
            body: payload,
        })
        if(!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`)
        }
    } catch (error) {throw error}

    return await response.json()
}

async function get(request: Partial<Request>) {
    request.method = RequestMethod.GET
    request.endpoint = request.endpoint ?? ''
    request.headers = request.headers ?? defaultHeaders
    return await fetchRequest(request)
}

async function head(request: Partial<Request>) {
    request.method = RequestMethod.HEAD
    return await fetchRequest(request)
}

async function post(request: Partial<Request>) {
    request.method = RequestMethod.POST
    return await fetchRequest(request)
}

async function put(request: Partial<Request>) {
    request.method = RequestMethod.PUT
    return await fetchRequest(request)
}

async function patch(request: Partial<Request>) {
    request.method = RequestMethod.PATCH
    return await fetchRequest(request)
}

async function deleteRequest(request: Partial<Request>) {
    request.method = RequestMethod.DELETE
    return await fetchRequest(request)
}

async function connect(request: Partial<Request>) {
    request.method = RequestMethod.CONNECT
    return await fetchRequest(request)
}

async function options(request: Partial<Request>) {
    request.method = RequestMethod.OPTIONS
    return await fetchRequest(request)
}

async function trace(request: Partial<Request>) {
    request.method = RequestMethod.TRACE
    return await fetchRequest(request)
}

export { Fetcher as default }
