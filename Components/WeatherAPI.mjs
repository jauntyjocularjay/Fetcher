import {
    Fetcher
} from '../Fetcher.mjs'

class Weather extends Fetcher {
    static base_url = 'http://api.weatherapi.com/v1'

    static async getHistory(city, date){
    /**
     * @todo test
     * @param {string} city
     * @param {string} date format yyyy-mm-dd
     */
    const url = `${Weather.base_url}/history.json?key=${APIKey.weather}&q=${city}&dt=${date}`
        const data = await this.getData(url)
        return data
    }
}
export {
    Weather
}

