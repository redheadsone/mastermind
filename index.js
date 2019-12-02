const combinationLength = 4;

const onlyUniqueColors = true;

function selectBall(event) {
  let element = event.target;
  console.log("selected", element);

  if (element.classList.contains("cell")) {
    console.log();

    addBall(element.getAttribute("color"));
  }
}

let currentCombination = []; // комбинашка которую я натыкала

function createCellMini(animal) {
  //empty
  let miniEl = document.createElement("div");
  miniEl.classList.add("cell", "mini", animal);
  return miniEl;
}

function createCheckEl(checkObj) {
  let checkEl = document.createElement("div");
  checkEl.classList.add("check");

  //bull
  for (let i = 0; i < checkObj.bullCount; i++) {
    let bullEl = createCellMini("bull");
    checkEl.appendChild(bullEl);
  }
  //cow
  for (let i = 0; i < checkObj.cowCount; i++) {
    let cowEl = createCellMini("cow");
    checkEl.appendChild(cowEl);
  }
  //empty
  for (let i = 0; i < checkObj.emptyCount; i++) {
    let emptyEl = createCellMini();
    checkEl.appendChild(emptyEl);
  }
  return checkEl;
}

let board = document.querySelector(".board");
//row current

function addBall(color) {
  //<div class="cell" color="f"></div>
  let currentRow = document.body.querySelector(".row.current");

  let ball = document.createElement("div");
  ball.classList.add("cell");
  ball.setAttribute("color", color);
  currentRow.appendChild(ball);

  currentCombination.push(color);
  if (currentCombination.length === combinationLength) {
    let recievedCheck = checkCombination(currentCombination, enigma);
    let checkEl = createCheckEl(recievedCheck);
    currentRow.appendChild(checkEl);
    currentRow.classList.remove("current");
    currentCombination = [];

    let nextRow = document.createElement("div");
    nextRow.classList.add("row", "current");
    board.appendChild(nextRow);
  }
}
function checkCombination(randomRow, myRow) {
  let animals = { bulls: [], cows: [] };

  for (var i = 0; i < combinationLength; i++) {
    if (myRow[i] === randomRow[i]) {
      animals.bulls.push(myRow[i]);
    } //if
  } //for
  for (var i = 0; i < combinationLength; i++) {
    if (randomRow.includes(myRow[i]) && !animals.bulls.includes(myRow[i])) {
      animals.cows.push(myRow[i]);
    }
  }

  return {
    bullCount: animals.bulls.length,
    cowCount: animals.cows.length,
    emptyCount: combinationLength - animals.bulls.length - animals.cows.length
  };
} //fn

// ДЛЯ каждого цвета в энигме:
// ЕСЛИ текущий цвет энигмы содержится где либо в комбе
// И этот цвет НЕ содержится в массиве бычьих цветов
// ТО добавить этот цвет в массив коров

// ВЕРНУТЬ {количество цветов в бычьем массиве, количество цветов в коровьем массиве}
// КОНЕЦ

let colors = ["a", "b", "c", "d", "e", "f"];
let enigma = [];

function generateCombination() {
  let result = [];

  //not-unique
  // for (let i = 0; i < combinationLength; i++) {
  //   let colorIndex = Math.round(Math.random() * (colors.length - 1));
  //   let randomColor = colors[colorIndex];
  //   result[i] = randomColor;
  // }

  // //unique
  let leftColors = Array.from(colors);
  for (let i = 0; i < combinationLength; i++) {
    let colorIndex = Math.round(Math.random() * (leftColors.length - 1));
    result[i] = leftColors[colorIndex];
    leftColors.splice(colorIndex, 1);
  }

  return result;
}
// нашла элемент в html с классом controls и положила в переменную
let ballsContainer = document.body.querySelector(".controls");
//вешаю функцию обработчик (selectBall) на событие click при помощи функции addEventListener
//вешаю на елемент ballsContainer
ballsContainer.addEventListener("click", selectBall);

enigma = generateCombination(); // = это присваиваем

function removeLastBall(event) {
  if (!event.target.classList.contains("current")) {
    return;
  }

  let currentRow = document.body.querySelector(".row.current");

  let ball = currentRow.lastChild; // берем последний шар натыкивания
  if (ball !== null) {
    ball.remove();

    currentCombination.pop();
  }
}
let buttonUndo = document.querySelector(".board");
buttonUndo.addEventListener("click", removeLastBall);
