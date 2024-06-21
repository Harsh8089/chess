import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./message.js";

export class Game {

    player1;
    player2;
    board;
    startTime;
    moveCount;

    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.move = {
            "from": null,
            "to": null 
        } 
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
        this.moveCount = 0
    }

    makeMove(socket, move) {
       if(socket == this.player1 || socket == this.player2) {
            if(this.moveCount % 2 == 0 && socket === this.player2) {
                console.log("Invalid Move - 1")
                return
            }
            if(this.moveCount % 2 == 1 && socket === this.player1) {
                console.log("Invalid Move -2")
            }

            try {
                this.board.move(move)
                this.moveCount += 1
            } catch (e) {
                console.log("Invalid Move")
                console.log(e)
            }
            
            if(this.board.isGameOver()) {
                console.log("check mate")
                this.player1.send({
                    type: GAME_OVER,
                    payload: {
                        winner: this.moveCount % 2 === 0 ? "black" : "white" 
                    }
                })
            }
            else {
                if(this.moveCount % 2 == 1) {
                    this.player2.send(
                        JSON.stringify({
                            type: MOVE,
                            payload: move
                        })
                    )
                }
                else {
                    this.player1.send(
                        JSON.stringify({
                            type: MOVE,
                            payload: move
                        })
                    )
                }
            }  


            console.log(this.board.moves.length)
       }
    }
}