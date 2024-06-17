import {
    Fetcher
} from '../Fetcher.mjs'



class OddsFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.the-odds-api.com'
        this.parameters = {apiKey: ENV.oddsAPI.key}
    }

    /*** @todo test */
    async getSports(){
        const endpoint = '/v4/sports/'
        return await this.getData(endpoint, {parameters: this.parameters})
    }

}

export { OddsFetcher }