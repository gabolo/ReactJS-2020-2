let movements = 0;
let contenedor = [
  "ficha1",
  "ficha2",
  "ficha3",
  "ficha4",
  "ficha5",
  "ficha6",
  "ficha7",
  "ficha8",
  "ficha9",
];
let solucion = [
  "img_1",
  "img_2",
  "img_3",
  "img_4",
  "img_5",
  "img_6",
  "img_7",
  "img_8",
  "img_9",
];
let gameArray = [];
let playerArray = [];

function setUp() {
  movements = 0;
  
  do{

    this.shuffle();

    for (let i = 0; i < contenedor.length; i++) {
        document.getElementById(contenedor[i]).className = "fichas " + gameArray[i];
       
      }
  }while(!this.solvable());

  //asignar onclick
  for(let j = 0 ; j<contenedor.length;j++ ){
    document.getElementById(contenedor[j]).style.pointerEvents = "auto";
  }

}
function mover(pos){ 
    let temp = document.getElementById(pos).className;
    console.log(temp);
    let prevPos = document.querySelector("."+temp.substring(7,)).id;

    let blankPos = document.querySelector(".img_9").id;
    let numero = prevPos.substring(5,) - blankPos.substring(5,);
    console.log(prevPos.substring(5,));
    if (numero == 3 || numero == -3 || numero == 1 || numero == -1) {
        console.log(document.getElementsByClassName("img_9")[0].className);
        document.getElementsByClassName("img_9")[0].className = temp;
        document.getElementById(pos).className = "fichas img_9";
    }
}

function shuffle() {
  gameArray = solucion.sort(function () {
    return Math.random() - 0.3;
  });
}
function costo(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (
        arr[j].substring(4) &&
        arr[i].substring(4) &&
        arr[i].substring(4) > arr[j].substring(4)
      ) 
      {
        inversions++;
      }
    }
  }
  return inversions;
}


function solvable() {
  let inv = this.costo(gameArray);
  console.log(inv);
  if (inv % 2 === 0) {
    return true;
  } 
  return false;
}
function load(){
    for(let j = 0 ; j<contenedor.length;j++ ){
        document.getElementById(contenedor[j]).style.pointerEvents = "none";
      }
    
}