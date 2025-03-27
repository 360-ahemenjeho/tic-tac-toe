const gameBoard = Array(9).fill('')

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let currentPlayer = 'X'

function playGame(index) {
  if (gameBoard[index]) {
    console.error('Already filled!')
    return
  }

  const checkRes = checkWinner(currentPlayer, gameBoard)
  console.log('CHECK RESPONSE: ', checkRes)
  if (checkRes.end) {
    console.log(checkRes.msg)
    return
  }

  gameBoard[index] = currentPlayer
  currentPlayer = switchPlayer(currentPlayer)
}

function switchPlayer(current) {
  return current === 'X' ? 'O' : 'X'
}

function checkWinner(player, gameBoard = []) {
  // Check if current user has filled any of these combinations
  const winner = winningCombination.some((combination) =>
    combination.every((i) => gameBoard[i] === player)
  )

  // Check if game is a tie (all cells filled)
  const isTie = gameBoard.every((cell) => cell !== '')

  // Determine return object
  if (winner) {
    return {
      end: true,
      msg: `Player ${player} wins!`
    }
  }

  if (isTie) {
    return {
      end: true,
      msg: 'Tie. Both players win!'
    }
  }

  return {
    end: false,
    msg: ''
  }
}

function __init__() {
  for (let i = 0; i < 9; i++) {
    playGame(i)
  }
}

__init__()

console.log('GAME BOARD: ', gameBoard)
