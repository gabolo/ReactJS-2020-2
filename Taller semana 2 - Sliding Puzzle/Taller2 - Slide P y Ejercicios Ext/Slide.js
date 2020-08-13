function f() {

    var m = document.querySelector('#Matriz');

    m.addEventListener('click', function (e) {
        console.log(document.getElementById(e.target.id).className);
        var temp = e.target.id.split(",");


        var x = parseInt(temp[0]);
        var y = parseInt(temp[1]);

        if (x > 1) {
            if (document.getElementById((x - 1) + "," + y).className == "blank") {

                tradeo(e.target.id, (x - 1) + "," + y);

            }
        }
        if (x < 3) {

            if (document.getElementById((x + 1) + "," + y).className == "blank") {

                tradeo(e.target.id, (x + 1) + "," + y);

            }
        }

        if (y > 1) {
            if (document.getElementById(x + "," + (y - 1)).className == "blank") {

                tradeo(e.target.id, x + "," + (y - 1));

            }
        }
        if (y < 3) {
            if (document.getElementById(x + "," + (y + 1)).className == "blank") {

                tradeo(e.target.id, x + "," + (y + 1));

            }
        }


        //tradeo(e.target.id, '3,3');

    }, false);


}
function tradeo(cuadrox, cuadroy) {
    var temporal
    temporal = document.getElementById(cuadrox).src;
    document.getElementById(cuadrox).src = document.getElementById(cuadroy).src;
    document.getElementById(cuadrox).className = 'blank';
    document.getElementById(cuadroy).src = temporal;
    document.getElementById(cuadroy).className=cuadrox;

}

function jugar() {
    
    document.getElementById('3,3').src = 'Imagen/Partes/Blank.PNG';
    document.getElementById('3,3').className = 'blank';
    random();
}

function random()
{
    var enJuego =false
    if(!enJuego){ 
        var fila;
        var columna;
        for (fila=1;fila<=3;fila++) {
            for (columna=1;columna<=3;columna++) {
                var fila2=Math.floor(Math.random()*3 + 1);
                var columna2=Math.floor(Math.random()*3 + 1);
                if(fila+","+columna!='3,3'){
                cambio(fila+","+columna,fila2+","+columna2);
                }
            } 
        }   
        enJuego = true;
    }
}
function cambio(cuadrox, cuadroy)
{
    var temporal
    temporal = document.getElementById(cuadrox).src;
    document.getElementById(cuadrox).src = document.getElementById(cuadroy).src;
    document.getElementById(cuadroy).src = temporal;
}