import {
    Fetcher
} from '../Fetcher.mjs'
import {
    ENV
} from '../secret.mjs'

class WeatherFetcher extends Fetcher {
    static glossary = {
        q: 'city,country',
        dt: 'dateYYYY-MM-DD'
    }

    constructor(){
        super('http://api.weatherapi.com/v1', {key: ENV.weather.key })
    }

    async getHistory(city, date){
    /**
     * @todo test
     * @param {string} city,country ex: Scottsdale,us
     * @param {string} date format yyyy-mm-dd
     */
        const endpoint = `/history.json`

        const params = super.parameters()
            params.q = city // City
            params.dt = date // Date

        return await this.GET(endpoint, { parameters: params })
    }
}

export {
    WeatherFetcher
}

