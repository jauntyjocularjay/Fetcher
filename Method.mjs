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

export {
    Method
}
