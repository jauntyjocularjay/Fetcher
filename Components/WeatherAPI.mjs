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
        super('http://api.weatherapi.com/v1')
    }
    async getHistory(city, date){
    /**
     * @todo test
     * @param {string} city
     * @param {string} date format yyyy-mm-dd
     */
        const endpoint = `/history.json`
        const params = {
            key: ENV.weather.key,
            q: city, // City
            dt: date // Date
        }
        const data = await this.getData(endpoint,{parameters: params})
        return data
    }
}
export {
    WeatherFetcher
}

