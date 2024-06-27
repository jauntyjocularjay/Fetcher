class SchemaType {
    static ARRAY = {
        type: "array",
        typeOf: () => { SchemaType.typeOf() }
    }
    static BIGINT = {
        type: "bigint",
        typeOf: () => { SchemaType.typeOf() }
    }
    static BOOLEAN = {
        type: "boolean",
        typeOf: () => { SchemaType.typeOf() }
    }
    static NUMBER = {
        type: "number",
        typeOf: () => { SchemaType.typeOf() }
    }
    static INTEGER = {
        type: "integer",
        typeOf: () => { SchemaType.typeOf() }
    }
    static DECIMAL = {
        type: "decimal",
        typeOf: () => { SchemaType.typeOf() }
    }
    static OBJECT = {
        type: "object",
        typeOf: () => { SchemaType.typeOf() }
    }
    static STRING = {
        type: "string",
        typeOf: () => { SchemaType.typeOf() }
    }
    static SYMBOL = {
        type: "symbol",
        typeOf: () => { SchemaType.typeOf() }
    }
    static NULL = {
        type: "null",
        typeOf: () => { SchemaType.typeOf() }
    }

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
    static typeOf(){
        return 'SchemaType'
    }
}

export { SchemaType }