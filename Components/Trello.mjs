import {
    Fetcher
} from '../Fetcher.mjs'



class TrelloFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.trello.com'
        this.APIKey = ENV.trelloAPI.key
        this.APIToken = ENV.trelloAPI.token
        this.suffix = `&key=${this.APIKey}&token=${this.APIToken}`
    }

    async getUserData(fields){
        fields = `fields=${fields}`
        const endpoint = `/1/members/me/boards?${fields}&${this.suffix}`
        //                /1/members/me/boards?fields=name,url&key={apiKey}&token={apiToken}
        return await this.getData(endpoint)
    }

    async getBoard(boardID){
        const endpoint = `/1/boards/${boardID}?${this.suffix}`
        //                /1/boards/{id}?key=APIKey&token=APIToken
        return await this.getData(endpoint)
    }

    async createBoard(workspace, boardName){
        boardName = `name=${boardName.toLowerCase()}`
        workspace = `&idOrganization=${workspace.toLowerCase()}`
        const endpoint = `/1/boards/?${boardName}${workspace}${this.suffix}`
        return await this.postData(endpoint, null)
    }

    async updateBoard(boardID, parameters){
        const endpoint = `1/boards/{id}?${parameters}${this.suffix}`
        return await this.putData(endpoint, null)
    }

    async deleteBoard(boardID){
        boardID = `${boardID.toLowerCase()}`
        const endpoint = `/1/boards/${boardID}?${this.suffix}`
        return await this.deleteData(endpoint, null)
    }
}

export { TrelloFetcher }