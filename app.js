const gameBoard = Array(9).fill('')

let currentPlayer = 'X'

function playGame(index) {
  if (gameBoard[index]) {
    console.error('Already filled!')
    return
  }

  gameBoard[index] = currentPlayer
  currentPlayer = switchPlayer(currentPlayer)
}

function switchPlayer(current) {
  return current === 'X' ? 'O' : 'X'
}

for (let i = 0; i < 9; i++) {
  playGame(i)
}

console.log('GAME BOARD: ', gameBoard)
