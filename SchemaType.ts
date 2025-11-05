export default class SchemaType {
    static ARRAY = new SchemaType('array')
    static BIGINT = new SchemaType('bigint')
    static BOOLEAN = new SchemaType('boolean')
    static NUMBER = new SchemaType('number')
    static INTEGER = new SchemaType('integer')
    static DECIMAL = new SchemaType('decimal')
    static OBJECT = new SchemaType('object')
    static STRING = new SchemaType('string')
    static SYMBOL = new SchemaType('symbol')
    static NULL = new SchemaType('null')

    static valid(obj: any) {
        if (typeof obj.type === 'string' && obj.type.length > 0) {
            return true
        } else {
            return false
        }
    }

    static typeOf() {
        return 'SchemaType'
    }

    static valueOf(schematype: SchemaType) {
        return `${SchemaType.typeOf()} { type: "${schematype.type}" }`
    }

    type: string

    constructor(param: string|{type?: string}) {
        this.type = ''

        if(typeof param === 'string'){
            this.type = param
        } else if (param && typeof param === 'object' && 'type' in param && typeof param.type === 'string'){
            this.type = param.type || ''
        } else {
            throw new Error('Invalid argument for SchemaType.constructor')
        }
    }

    toString() {
        return `${SchemaType.typeOf()} { type: "${this.type}" }`
    }

    typeOf() {
        return SchemaType.typeOf()
    }
}
