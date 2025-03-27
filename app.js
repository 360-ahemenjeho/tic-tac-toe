function GameController() {
  let gameBoard = Array(9).fill('')

  const boardEl = document.querySelector('#board')
  const statusEl = document.querySelector('#status')
  const resetEl = document.querySelector('#reset')

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
  let isPlaying = true

  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }

  function checkWinner() {
    // Check if current user has filled any of these combinations
    const winner = winningCombination.some((combination) =>
      combination.every((i) => gameBoard[i] === currentPlayer)
    )

    // Check if game is a tie (all cells filled)
    const isTie = gameBoard.every((cell) => cell !== '')

    // Determine return object
    if (winner) {
      return {
        end: true,
        msg: `Player ${currentPlayer} wins!`
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

  function updateStatus(msg = '') {
    if (msg) statusEl.textContent = msg
    else statusEl.textContent = `Current player: ${currentPlayer}`
  }

  function resetGame() {
    gameBoard = Array(9).fill(null)

    const cells = boardEl.children
    for (let cell of cells) {
      cell.textContent = ''
    }

    currentPlayer = 'X'
    updateStatus()
  }

  function playGame(e) {
    const currEl = e.target
    const cellIndex = parseInt(currEl.dataset.index)

    if (gameBoard[cellIndex] || !isPlaying) return

    gameBoard[cellIndex] = currentPlayer
    currEl.textContent = currentPlayer

    const checkRes = checkWinner()

    if (checkRes.end) {
      updateStatus(checkRes.msg)
      isPlaying = false
      return
    }

    switchPlayer()
    updateStatus()
  }

  function initGame() {
    boardEl.innerHTML = ''
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cell.addEventListener('click', playGame)
      boardEl.appendChild(cell)
    }

    resetEl.addEventListener('click', resetGame)
    updateStatus()
  }

  // PUBLIC API
  return { init: initGame }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = GameController()
  game.init()
})
