let movements = 0;
let divID = [
  "tile1",
  "tile2",
  "tile3",
  "tile4",
  "tile5",
  "tile6",
  "tile7",
  "tile8",
  "tile9",
  "tile10",
  "tile11",
  "tile12",
  "tile13",
  "tile14",
  "tile15",
  "tile16",
];
let solution = [
  "imgcont1",
  "imgcont2",
  "imgcont3",
  "imgcont4",
  "imgcont5",
  "imgcont6",
  "imgcont7",
  "imgcont8",
  "imgcont9",
  "imgcont10",
  "imgcont11",
  "imgcont12",
  "imgcont13",
  "imgcont14",
  "imgcont15",
  "imgcont16",
];
let gameArray = [];
let playerArray = [];

function setUp() {
  movements = 0;
  // verificar si es solucionable
  do {
    // desordenar el arreglo solucion por el arrelo de juego
    this.shuffle();
    // Asignar nuevo orden barajado a los div
    for (let i = 0; i < divID.length; i++) {
      document.getElementById(divID[i]).className = "tiles " + gameArray[i];
    }
  } while (!this.solvable());

  //asignar onclick
  for (let j = 0; j < divID.length; j++) {
    document.getElementById(divID[j]).style.pointerEvents = "auto";
  }
}
function move(pos) {
  let temp = document.getElementById(pos).className;
  let prevPos = document.querySelector("." + temp.substring(6)).id;
  let blankPos = document.querySelector(".imgcont16").id;
  let numero = prevPos.substring(4) - blankPos.substring(4);
  if (numero == 4 || numero == -4 || numero == 1 || numero == -1) {
    document.getElementsByClassName("imgcont16")[0].className = temp;
    document.getElementById(pos).className = "tiles imgcont16";
    movements++;
    document.getElementById("count").innerHTML = "Movimientos: " + movements;
  }

  let gano = this.win();
  if (gano) {
    load();
    swal("Ganaste!", "Movimientos: " + movements, "success");
  }
}
function loadPlayerArray() {
  for (let i = 0; i < divID.length; i++) {
    playerArray[i] = document.getElementById(divID[i]).className.substring(6);
  }
}
function win() {
  for (let i = 0; i < playerArray.length; i++) {
    if (playerArray[i] != solution[i]) {
      return false;
    }
  }

  return true;
}
function shuffle() {
  gameArray = solution.sort(function () {
    return Math.random() - 0.5;
  });
}
function getInversions(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (
        arr[j].substring(7) &&
        arr[i].substring(7) &&
        arr[i].substring(7) > arr[j].substring(7)
      ) {
        inversions++;
      }
    }
  }
  return inversions;
}
function getBlankRow() {
  let pos = document.querySelector(".imgcont16").id;
  let numpos = pos.substring(4);
  if ((numpos >= 1 && numpos <= 4) || (numpos >= 9 && numpos <= 12)) {
    return true;
  }
  return false;
}
function solvable() {
  let inv = this.getInversions(gameArray);

  let even = this.getBlankRow();
  if (even && inv % 2 === 1) {
    return true;
  } else if (!even && inv % 2 === 0) {
    return true;
  }

  return false;
}
function load() {
  movements = 0;
  document.getElementById("count").innerHTML = "Movimientos: " + movements;
  this.loadPlayerArray();
  for (let j = 0; j < divID.length; j++) {
    document.getElementById(divID[j]).style.pointerEvents = "none";
  }
}
