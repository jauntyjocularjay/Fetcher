class SchemaType {
    static ARRAY = {"type": "array"}
    static BIGINT = {"type": "bigint"}
    static BOOLEAN = {"type": "boolean"}
    static NUMBER = {"type": "number"}
    static OBJECT = {"type": "object"}
    static STRING = {"type": "string"}
    static SYMBOL = {"type": "symbol"}
    static NULL = {"type": "null"}

    /** @todo test */
    static matches(obj){
        const entries = Object.entries(obj)
        if(
            entries.length === 2 &&
            entries[0] === 'type' && (
            entries[1] === 'array' ||
            entries[1] === 'bigint' ||
            entries[1] === 'boolean' ||
            entries[1] === 'number' ||
            entries[1] === 'object' ||
            entries[1] === 'string' ||
            entries[1] === 'symbol' ||
            entries[1] === 'null')
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