import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'



class TrelloFetcher extends Fetcher {
    constructor(){
        super()
        this.base_url = 'https://api.trello.com'
        this.parameters = {
            key: ENV.trello.key,
            token: ENV.trello.token
        }
    }

    /*** @todo test */
    async getUserData(fields){
        const params = this.parameters.create()
        params.fields = fields
        const endpoint = '/1/members/me/boards'
        return await this.getData(endpoint, {parameters: params})
    }

    /*** @todo test */
    async getBoard(boardID){
        const endpoint = `/1/boards/${boardID}`
        return await this.getData(endpoint, {parameters: this.parameters})
    }

    /*** @todo test */
    async createBoard(workspace, boardName){
        const params = this.parameters.create()
        params.name = boardName.toLowerCase()
        params.idOrganization = workspace.toLowerCase()
        const endpoint = '/1/boards/'
        return await this.postData(endpoint, null)
    }

    /*** @todo test */
    async updateBoard(boardID, parameters){
        const params = this.parameters
        const endpoint = `/1/boards/${boardID}`
        return await this.putData(endpoint, {parameters: params})
    }

    /*** @todo test */
    async deleteBoard(boardID){
        boardID = boardID.toLowerCase()
        const endpoint = `/1/boards/${boardID}`
        return await this.deleteData(endpoint, {parameters: this.parameters})
    }
}

export { TrelloFetcher }