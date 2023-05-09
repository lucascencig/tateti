import confetti from 'canvas-confetti'
import { useState } from 'react'
import './App.css'


const TURNS = {
  X: '🟥',
  O: '🟦'
}



const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const winner_combos = [
  [0, 1, 2],
  [2, 1, 0],
  [0, 3, 6],
  [6, 3, 0],
  [6, 7, 8],
  [8, 7, 6],
  [8, 5, 2],
  [2, 5, 8],
  [3, 4, 5],
  [5, 4, 3],
  [1, 4, 7],
  [7, 4, 1],
  [0, 4, 8],
  [8, 4, 0],
  [2, 4, 6],
  [6, 4, 2]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [pointsX, setPointsX] = useState(0)
  const [pointsO, setPointsO] = useState(0)

  const checkWinner = (boardToCheck) => {

    for (const combo of winner_combos) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }


  const updateBoard = (index) => {


    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }

    if (newWinner === TURNS.X) {
      const newPointsX = pointsX + 1
      setPointsX(newPointsX)
      console.log(newPointsX)
      return newPointsX

    }
    if (newWinner === TURNS.O) {
      const newPointsO = pointsO + 1
      setPointsO(newPointsO)
      console.log(newPointsO)
      return newPointsO
    }

  }

  const handleRestart = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  }

  const handleRestartAll = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setPointsX(0)
    setPointsO(0)
  }


  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <section>
        <button onClick={handleRestart}>Reiniciar</button>
      </section>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <section>
        {
          winner !== null && (
            <section className='winner'>
              {
                pointsX === 3 ?
                  <div className='textwin'>
                    <h2> {'¡' + winner + ' Gana el juego!'}</h2>

                    <button onClick={handleRestartAll}>Reiniciar</button>

                  </div>
                  :
                  pointsO === 3 ?
                    <div className='textwin'>
                      <h2> {'¡ ' + winner + ' Gana el juego!'}</h2>
                      {confetti()}
                      <button onClick={handleRestartAll}>Reiniciar</button>
                    </div>
                    :
                    <div className='text'>

                      <header className='win'>
                        {winner && <Square>{winner}</Square>}
                      </header>
                      <button onClick={handleRestart}>Reiniciar</button>
                    </div>

              }


            </section>
          )
        }
      </section>

      <section>
        <h3 className='points'>Puntos de jugadores: </h3>
        <span>Puntos 🟥 = <p className='pointsX'>{pointsX}</p> </span> <br />
        <span>Puntos 🟦 = <p className='pointsO'>{pointsO}</p> </span>
      </section>

    </main>
  )
}

export default App
