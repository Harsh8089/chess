import React from 'react'
import chess_board from '../assets/chess_board.jpg'
import { useNavigate } from 'react-router-dom'


function Landing() {
    const navigate = useNavigate()

  return (
    <div className='bg-slate-900 text-white w-[100vw] h-[100vh] p-3'>
        <div className='flex items-center justify-evenly h-full'>
            <div className='w-[50%]'>
                <img 
                src={chess_board}
                className='w-[100%] h-[80%]'
                loading='lazy'
                ></img>
            </div>
            <div className='w-[50%] flex flex-col items-center'>
                <button
                onClick={() => navigate('/game')}                
                className='text-[25px] p-8 bg-green-800 hover:bg-green-500 transition-all duration-100 rounded-lg'>Create A Game</button>
            </div>
        </div>
    </div>
  )
}

export default Landing