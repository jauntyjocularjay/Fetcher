import {
    Fetcher
} from '../Fetcher.mjs'



class OddsFetcher extends Fetcher {
    constructor(){
        super('https://api.the-odds-api.com')
        this.parameters = { apiKey: ENV.oddsAPI.key }
    }

    /*** @todo test */
    async getSports(){
        const endpoint = '/v4/sports/'
        return await this.GET(endpoint, {parameters: this.parameters})
    }

}

export { OddsFetcher }