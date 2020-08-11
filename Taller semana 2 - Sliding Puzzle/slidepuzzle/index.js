// Declare the className of the empty piece
const emptyPiece = "cuadro9";

function shufflePieces() {
    for (let row = 1; row < +3; ++row) {
        for (let column = 1; column < +3; ++column) {
            let randomRow = Math.floor(Math.random() * 3 + 1);
            let randomColumn = Math.floor(Math.random() * 3 + 1);
            //console.log("cell" + row + column + "\n" + "cell" + randomRow + randomColumn);
            switchPiecePos("cell" + row + column, "cell" + randomRow + randomColumn);
        }
    }
}

function switchPiecePos(cell1, cell2) {
    let tempPiece = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = tempPiece;
    console.log("Se cambió");
}

// Event Delegation Design Pattern.
const table = document.querySelector(".slidepuzzle-container");
table.onclick = function movePiece(event) {
    let cell = event.target;
    console.log(event.target.className);
    console.log(event.target);

    // If the id of the pice is different than cell33, we can check where to move the piece
    if (cell.className === emptyPiece) {
        console.log("Celda sin imagen no se puede mover.");
        return;
    }

    // We have to obtain the number of the column and row of the piece selected.
    let cellRow = parseInt(cell.id.slice(-2).charAt(0));
    let cellColumn = parseInt(cell.id.charAt(cell.id.length - 1));
    console.log("cellRow: " + cellRow + "\ncellColumn: " + cellColumn);

    //Check if emptyPiece is to the right
    if (cellColumn < 3) {
        if (document.getElementById("cell" + cellRow + (cellColumn + 1)).className == "cuadro9") {
            console.log("pieza vacia a la derecha.");
            switchPiecePos(cell.id, "cell" + cellRow + (cellColumn + 1));
        }
    }

    console.log;
    if (cellColumn > 1) {
        if (document.getElementById("cell" + cellRow + (cellColumn - 1)).className == "cuadro9") {
            console.log("pieza vacia a la izquierda.");
            switchPiecePos(cell.id, "cell" + cellRow + (cellColumn - 1));
        }
    }

    //Check if emptyPiece is above
    if (cellRow > 1) {
        if (document.getElementById("cell" + (cellRow - 1) + cellColumn).className == "cuadro9") {
            console.log("pieza vacia arriba.");
            switchPiecePos(cell.id, "cell" + (cellRow - 1) + cellColumn);
        }
    }

    //Check if emptyPiece is below
    if (cellRow < 3) {
        if (document.getElementById("cell" + (cellRow + 1) + cellColumn).className == "cuadro9") {
            console.log("pieza vacia abajo.");
            switchPiecePos(cell.id, "cell" + (cellRow + 1) + cellColumn);
        }
    }
};
