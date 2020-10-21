let players = [];
let turn = 0;
let gameover = false;

let dimension = parseInt(document.getElementById("dim").value);

let board = new Array(dimension)
  .fill("")
  .map(() => new Array(dimension).fill(""));

const changeDimension = (event) => {
  dimension = parseInt(event.target.value);
  board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};

document.getElementById("dim").addEventListener("change", changeDimension);

//dim.addEventListener("change", () => console.log(dim.value));

const create = () => {
  let container = document.getElementById("game_container");

  // let dim = document.getElementById("dim");

  if (dimension > 3) {
    container.style.height = "50%";
    console.log("height changed");
    let body = document.getElementById("body");
    body.style.height = "180vh";

    //container.classList("game1");
  }

  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < dimension; j++) {
      let col = document.createElement("div");
      col.classList.add("colm");
      col.setAttribute("id", i.toString(), j.toString());
      col.addEventListener("click", (event) => clicked(col, i, j));

      row.appendChild(col);
    }
    container.appendChild(row);
  }
};

function start() {
  let value1 = document.getElementById("p1");
  let value2 = document.getElementById("p2");
  let player1 = value1.value;
  let player2 = value2.value;
  let select = document.getElementById("dim");

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player names is required");
    return;
  }
  value1.setAttribute("disabled", true);
  value2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);

  let game = document.getElementById("game_container");
  game.classList.remove("hide");

  let upperbody = document.getElementById("intro");
  upperbody.classList.add("hide");
  players.push(player1);
  players.push(player2);

  document.getElementById("pturn").innerHTML = players[0] + "'s Turn ";
  create();
}

const isEmpty = (value) => !value || !value.trim();

const clicked = (col, i, j) => {
  // console.log(board);
  // console.log(i, j);
  let el = col;
  if (el.innerHTML !== "" || gameover) {
    return;
  }

  // let id = el.id;

  // let i = id[0];
  // let j = id[1];

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];
  el.classList.add("elements");

  if (turn % 2 === 0) {
    el.style.color = "white";
    el.style.background = "black";
  } else {
    el.style.color = "red";
    el.style.background = "white";
  }

  if (calculatewinner()) {
    //alert(players[turn % 2] + " won");
    let wintext = document.getElementById("win");
    let restart = document.getElementById("restart");
    let crackers = document.getElementById("crackers");

    restart.classList.remove("hide");
    crackers.classList.remove("hide");
    wintext.innerHTML = players[turn % 2] + " Won";
    gameover = true;
    return;
  }

  turn++;
  if (turn === dimension * dimension) {
    let wintext = document.getElementById("win");
    let restart = document.getElementById("restart");

    restart.classList.remove("hide");
    wintext.innerHTML = "Game is Drwon";
    gameover = true;
    return;
  }

  document.getElementById("pturn").innerHTML = players[turn % 2] + "'s turn";
};

// calculate winner function

const calculatewinner = () => {
  let len = board.length;

  //console.log(len);
  //console.log(dimension);

  if (turn < len) {
    return false;
  }
  // const winnercombination = [
  //   ["00", "01", "02"],
  //   ["10", "11", "12"],
  //   ["20", "21", "22"],
  //   ["00", "10", "20"],
  //   ["01", "11", "21"],
  //   ["02", "12", "22"],
  //   ["00", "11", "22"],
  //   ["02", "11", "20"]
  // ];
  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    //console.log(`${i} Row clear`);
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    //console.log(`${i} Col clear`);
    if (count === len) {
      return true;
    }
  }

  // check for diagonal

  let i = board[0][0];
  let j = 0;
  while (j < len) {
    //console.log(`${board[j][j]} diagonal`);
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  //console.log(`Diagonal clear`);
  //console.log(`${j} j for diagonal`);
  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];

  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  //console.log(`reverse Diagonal clear`);
  if (rev_i === len) {
    return true;
  }

  return false;
};
