document.addEventListener("DOMContentLoaded", game);

function game() {
  document.getElementById('puzzle').addEventListener("click", clickeo);
}

function clickeo(event) {
  let celdita = event.target;
  let ubicacion = celdita.id;
  seleccionada(Number(ubicacion[1]), Number(ubicacion[2]));
  ganacion()
};

function swapTiles(cell1,cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;

}

function seleccionada(row,column) {
  var cell = document.getElementById("c"+row+column);
  var tile = cell.className;
  if (tile!="tile9") {

    if (column<3) {
      if ( document.getElementById("c"+row+(column+1)).className=="tile9") {
        swapTiles("c"+row+column, "c"+row+(column+1));
        return;
      }
    }

    if (column>1) {
      if ( document.getElementById("c"+row+(column-1)).className=="tile9") {
        swapTiles("c"+row+column,"c"+row+(column-1));
        return;
      }
    }

    if (row>1) {
      if ( document.getElementById("c"+(row-1)+column).className=="tile9") {
        swapTiles("c"+row+column,"c"+(row-1)+column);
        return;
      }
    }

    if (row<3) {
      if ( document.getElementById("c"+(row+1)+column).className=="tile9") {
        swapTiles("c"+row+column,"c"+(row+1)+column);
        return;
      }
    }
  }
}

function shuffle() {

  for (var row=1;row<=3;row++) {
    for (var column=1;column<=3;column++) {

      var row2=Math.floor(Math.random()*3 + 1);
      var column2=Math.floor(Math.random()*3 + 1);

      swapTiles("c"+row+column,"c"+row2+column2);
    }
  }
}

function happiness(){
  let happiness = new Audio('css/sounds/sugar-sugar.mp3');
  happiness.volume = 1.0;
  happiness.play();
}

function ganacion() {
  confg = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9"]
  actual = []
  for (var i = 1; i <= 3; i++) {
    for (var j = 1; j <= 3; j++) {
      actual.push(document.getElementById("c" + i + j).className);
    }
  }

  for (var k = 0; k < confg.length; k++) {
    if (confg[k] != actual[k]) {
      return;
    }
  }

  let ganaste = new Audio("css/sounds/victory.wav");
  ganaste.play();

  setTimeout(function() {alert('Ganaste!')}, 1000)
}
