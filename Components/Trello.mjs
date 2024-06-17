import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'



class TrelloFetcher extends Fetcher {
    constructor(){
        super('https://api.trello.com')
        this.parameters = {
            key: ENV.trello.key,
            token: ENV.trello.token
        }
    }

    /*** @todo test */
    async getUserData(fields){
        const params = super.parameters()
        params.fields = fields
        const endpoint = '/1/members/me/boards'
        return await this.GET(endpoint, {parameters: params})
    }

    /*** @todo test */
    async getBoard(boardID){
        const endpoint = `/1/boards/${boardID}`
        return await this.GET(endpoint, {parameters: this.parameters})
    }

    /*** @todo test */
    async createBoard(workspace, boardName){
        const params = super.parameters()
        params.name = boardName.toLowerCase()
        params.idOrganization = workspace.toLowerCase()
        const endpoint = '/1/boards/'
        return await this.POST(endpoint, null)
    }

    /*** @todo test */
    async updateBoard(boardID, parameters){
        const params = this.parameters
        const endpoint = `/1/boards/${boardID}`
        return await this.PUT(endpoint, {parameters: params})
    }

    /*** @todo test */
    async deleteBoard(boardID){
        boardID = boardID.toLowerCase()
        const endpoint = `/1/boards/${boardID}`
        return await this.DELETE(endpoint, {parameters: this.parameters})
    }
}

export { TrelloFetcher }