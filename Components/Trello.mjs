import {
    Fetcher
} from '../Fetcher.mjs'
import { ENV } from '../secret.mjs'



class TrelloFetcher extends Fetcher {
    constructor(){
        super('https://api.trello.com', { 'key': ENV.trello.key, 'token': ENV.trello.token })
    }

    /*** @todo test */
    parameters(){
        return this.parameters
    }

    /*** @todo test */
    async getUserData(fields={}){
        const params = super.parameters()
        params.fields = fields
        const endpoint = '/1/members/me/boards'
        return await this.GET(endpoint, {parameters: params})
    }

    /*** @todo test */
    async getBoard(boardID=''){
        const endpoint = `/1/boards/${boardID}`
        return await this.GET(endpoint, {parameters: this.parameters})
    }

    /*** @todo test */
    async getBoardLists(board_id=null){
        const endpoint = `/1/boards/${board_id}/lists`
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

    async getList(list_id=''){
        list_id = list_id.toLowerCase()
        const endpoint = `1/lists/${list_id}`
        return await this.GET(endpoint, {parameters: this.parameters})
        // 1/lists/{:list_id}
    }
}

export { TrelloFetcher }