import {
    Fetcher
} from '../Fetcher.mjs'



class OddsFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.the-odds-api.com'
        this.APIsuffix = `?apiKey=${ENV.oddsAPI.key}`
    }
    async getSports(){
        const endpoint = '/v4/sports/'+ this.APIsuffix
        console.log('getSports endpoint:', endpoint)
        return await this.getData(endpoint)
    }

}

export { OddsFetcher }