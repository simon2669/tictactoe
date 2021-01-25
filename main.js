const cellElements = Array.from(document.querySelectorAll('[data-cell]'));
const xClass = 'x';
const oClass = 'o';
const winningMessage = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton');
const winningCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]
let circleTurn;
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true })
  });

};

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? oClass : xClass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    console.log('object');
    endGame(false);
  } else if (checkDraw()) {
    winningMessage.textContent = 'Döntetlen'
  } else {
    swapTurns();
  }

}
function checkDraw() {
  return cellElements.every((item) => {
    if (item.classList.contains('x') || item.classList.contains('o')) {
      return true;
    } else {
      return false;
    }

  })
}
function endGame(isDraw) {
  if (isDraw) {
    winningMessage.textContent = `Játék vége!  Döntetlen !`;
  }
  else {
    winningMessage.textContent = `Játék vége!  A ${circleTurn ? "Fekete" : "Piros"} szín nyert!`;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = circleTurn ? false : true;
}

function checkWin(currentClass) {
  return winningCombination.some((comb) => {
    return comb.every((index) => {
      return cellElements[index].classList.contains(currentClass)
    })
  })

}
restartButton.addEventListener('click', function () {
  cellElements.forEach((item => {
    item.classList.remove('x');
    item.classList.remove('o');
    item.removeEventListener('click', handleClick)
  }));
  // cellElements.forEach((cell) => {
  //   cell.removeEventListener('click', handleClick)
  // });
  startGame();
  console.log('ddd')

})
startGame();