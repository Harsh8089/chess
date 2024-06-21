import { INIT_GAME, MOVE } from "./message.js"
import { Game } from "./Game.js"

export class GameManager {
    games = []
    users = []
    pendingUserID = null

    constructor() {
        this.games = []
        this.users = []
        this.pendingUserID = null
    }

    addUser(socket) {
        this.users.push(socket)
        this.handleMessage(socket)
    } 

    removeUser(socket) {
        this.users = this.users.find(userId => userId !== socket)
    }

    activeUser() {
        console.log("Pending user: ", this.pendingUserID)
        console.log(this.users.length)
        
    }

    handleMessage(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString())
            console.log(message)
            if(message.type === INIT_GAME) {
                if(this.pendingUserID) {
                    console.log("Game Started")
                    const game = new Game(this.pendingUserID, socket);
                    this.games.push(game)
                    this.pendingUserID = null
                }
                else {
                    this.pendingUserID = socket
                }
            }
            else if(message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if(game) {
                    console.log("can make a move")
                    game.makeMove(socket, message.move)
                }
            }
        })
    }
}