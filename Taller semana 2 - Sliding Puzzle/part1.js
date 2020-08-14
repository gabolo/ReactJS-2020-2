function random(a1, a2) {
  let z = document.getElementById(a1).className;
  document.getElementById(a1).className = document.getElementById(a2).className;
  document.getElementById(a2).className = z;
}

function Onclick(fila, columna) {
  let a = document.getElementById("a" + fila + columna);
  let posicion = a.className;
  if (posicion != "posicion9") {

    if (columna < 3) {
      if (document.getElementById("a" + fila + (columna + 1)).className == "posicion9") {
        random("a" + fila + columna, "a" + fila + (columna + 1));
        return;
      }
    }

    if (columna > 1) {
      if (document.getElementById("a" + fila + (columna - 1)).className == "posicion9") {
        random("a" + fila + columna, "a" + fila + (columna - 1));
        return;
      }
    }

    if (fila > 1) {
      if (document.getElementById("a" + (fila - 1) + columna).className == "posicion9") {
        random("a" + fila + columna, "a" + (fila - 1) + columna);
        return;
      }
    }

    if (fila < 3) {
      if (document.getElementById("a" + (fila + 1) + columna).className == "posicion9") {
        random("a" + fila + columna, "a" + (fila + 1) + columna);
        return;
      }
    }
  }

}


function retry() {
  this.contador();
  for (let i = 1; i <= 3; i++) {
    for (let z = 1; z <= 3; z++) {

      let i2 = Math.floor(Math.random() * 3 + 1);
      let z2 = Math.floor(Math.random() * 3 + 1);

      random("a" + i + z, "a" + i2 + z2);
    }
  }
}


function contador() {
  let n = 0;
  let l = document.getElementById("contar");
  window.setInterval(function () {
    l.innerHTML = n;
    n++;
  }, 1000);

}

