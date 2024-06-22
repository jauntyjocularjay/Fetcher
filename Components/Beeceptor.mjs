import {
    Fetcher
} from '../Fetcher.mjs'





class BeecptorFetcher extends Fetcher{
    constructor(crud='crud'){
        super('https://fetcher.free.beeceptor.com/api/'+crud)
    }

    async clearData(){
        let elements = await f.GET()
        let element = elements[i]

        for(let i = 0; element !== undefined; i++){
            await f.DELETE(`/${element.id}`)
            element = elements[i]
        }
    }
}

export { BeecptorFetcher }