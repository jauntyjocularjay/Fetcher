class SchemaType {
    static ARRAY = {"type": "array"}
    static BIGINT = {"type": "bigint"}
    static BOOLEAN = {"type": "boolean"}
    static NUMBER = {"type": "number"}
    static INTEGER = {"type": "integer"}
    static DECIMAL = {"type": "decimal"}
    static OBJECT = {"type": "object"}
    static STRING = {"type": "string"}
    static SYMBOL = {"type": "symbol"}
    static NULL = {"type": "null"}

    static matches(obj){
        const entry = Object.entries(obj)[0]

        if(
            entry.length === 2 &&
            entry[0] === 'type' && (
            entry[1] === 'array' ||
            entry[1] === 'bigint' ||
            entry[1] === 'boolean' ||
            entry[1] === 'number' ||
            entry[1] === 'integer' ||
            entry[1] === 'decimal' ||
            entry[1] === 'object' ||
            entry[1] === 'string' ||
            entry[1] === 'symbol' ||
            entry[1] === 'null')
        ){
            return true
        } else {
            return false
        }
    }

    /** @todo test */
    typeOf(){
        return 'SchemaType'
    }
}

export { SchemaType }