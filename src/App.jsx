
import { useState } from 'react'
import './App.css'


const Turns = {
  X: 'x',
  O: 'o'
}



const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard()
  }

  return (
    <div onClick={updateBoard} className='className'>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(1))

  const [turn, setTurn] = useState(Turns.X)

  const updateBoard = () => {
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
  }

  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>
    </main>
  )
}

export default App
