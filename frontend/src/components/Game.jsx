import React, { useState } from 'react'
import { Chess } from "chess.js";
import ChessBoard from './ChessBoard';
import useSocket from '../hooks/useSocket'
import { GAME_OVER, INIT_GAME, MOVE } from '../../../backend/message';
import { useEffect } from 'react';

function Game() {

    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [color, setColor] = useState(null)

    const socket = useSocket()

    useEffect(() => {
        if(socket) {
            socket.onmessage = (event) => {
              const message = JSON.parse(event.data)
              console.log(message)
              if(message.type === MOVE) {
                  chess.move(message.payload)
                  setBoard(chess.board())
              }
              else if(message.type === GAME_OVER) {
                setChess(new Chess())
                console.log("Game Over")
              }  
              else {
                setColor(message.payload.color)
              }
            }
        }
    }, [socket])


   
    
    

  return (
    <div className='flex w-[100vw] h-[100vh] justify-evenly items-center '>
        <ChessBoard chess={chess} setChess={setChess} board={board} setBoard={setBoard} color={color} socket={socket}/>
        <button 
        onClick={() => socket.send(JSON.stringify({
          type: INIT_GAME 
        }))}
        className='bg-[#f87171] hover:bg-[#fecaca] w-[10vw] h-[10vh] rounded-lg'
        >Play</button>
    </div>
  )
}

export default Game