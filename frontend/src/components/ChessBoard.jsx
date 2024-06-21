import React, { useEffect, useState } from 'react'
import { MOVE } from '../../../backend/message'
import { pieces } from './pieces'

function ChessBoard({chess, board, setBoard, color, socket}) {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    
    const handleMove = () => {
        if(from && to) {
            socket.send(JSON.stringify({
                type: MOVE,
                move: {
                    from,
                    to
                }
            }))
            try {
                chess.move({
                    from,
                    to
                })
                setBoard(chess.board())
            } catch (error) {
                console.log(from, to)
                console.log("ERROR")
            }
            
            setFrom(null)
            setTo(null)
        }
    }

    useEffect(() => {
        handleMove()
    }, [from, to])

    console.log(board)

  return (
    <div className='w-[700px] h-[700px]'>
        {
            board.map((rows, r) => (
                <div key={r} className='flex flex-row w-[100%] h-[87.5px]'>
                    {
                        rows.map((col, c) => (
                            <div
                            onClick={() => {
                                try{ 
                                    if(!from) {
                                        setFrom(String.fromCharCode('a'.charCodeAt(0) + c) + (8 - r))
                                    }
                                    else {
                                        setTo(String.fromCharCode('a'.charCodeAt(0) + c) + (8 - r))
                                    }
                                    
                                }
                                catch(e) {
                                    console.log(e)
                                }
                            }}
                            key={c}
                            className={`${(r + c) % 2 == 0 ? 'bg-[#f87171]' : 'bg-[#fecaca]'} 
                            w-[87.5px] h-[87.5px]`}
                            >
                                {
                                    col ? <div className='text-center'>
                                        <img 
                                        src={pieces[col.type+""+col.color]}
                                        alt={col.type+""+col.color}
                                        className='m-auto '
                                        ></img> 
                                    </div>: ''
                                }
                            </div>
                        ))
                    }
                    
                </div>
            ))
        }
    </div>
  )
}

export default ChessBoard